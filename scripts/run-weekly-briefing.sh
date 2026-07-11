#!/bin/zsh
#
# run-weekly-briefing.sh — unattended generator for the Weekly NWA Briefing.
#
# Invoked by the launchd agent ai.lvng.nwa-weekly-briefing every Friday at 6:00 PM ET,
# with catch-up firings Saturday and Sunday at 10:00 AM that no-op if Friday already
# published (or on next wake if the Mac is asleep). Runs Claude Code headlessly in
# full-bypass mode so no tool ever prompts, then commits + pushes so Vercel rebuilds.
#
# To test by hand:  zsh /Users/jamie/ClaudeCodeProjects/nwa-weekly/scripts/run-weekly-briefing.sh

set -u

REPO="/Users/jamie/ClaudeCodeProjects/nwa-weekly"
SKILL="/Users/jamie/.claude/scheduled-tasks/nwa-weekly-briefing/SKILL.md"
LOG_DIR="/Users/jamie/.claude/scheduled-tasks/nwa-weekly-briefing/logs"
STATE_FILE="/Users/jamie/.claude/scheduled-tasks/nwa-weekly-briefing/last-success-week"

# launchd gives us a minimal environment. claude reads its OAuth token from the macOS login
# Keychain, which requires HOME/USER/LOGNAME to be set; PATH must include node/claude.
export HOME="${HOME:-/Users/jamie}"
export USER="${USER:-jamie}"
export LOGNAME="${LOGNAME:-jamie}"
export PATH="/Users/jamie/.nvm/versions/node/v20.19.3/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Best-effort: load RESEND_API_KEY (and any other secrets) if a local env file exists.
# Email is non-blocking — if the key is absent the run still publishes to Vercel.
ENV_FILE="/Users/jamie/.claude/scheduled-tasks/nwa-weekly-briefing/.env"
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

mkdir -p "$LOG_DIR"
STAMP="$(date +%Y-%m-%d_%H%M%S)"
LOG="$LOG_DIR/run-$STAMP.log"

# The week is identified by its Friday (today if Friday, else the most recent one).
# Saturday/Sunday catch-up firings exit quietly when Friday's run already published.
THIS_FRIDAY="$(date -v-fri +%Y-%m-%d)"
if [ -f "$STATE_FILE" ] && [ "$(cat "$STATE_FILE")" = "$THIS_FRIDAY" ]; then
  echo "===== $STAMP: briefing for week of Friday $THIS_FRIDAY already published; skipping =====" >> "$LOG"
  exit 0
fi

cd "$REPO" || { echo "FATAL: cannot cd to $REPO" >> "$LOG"; exit 1; }

PROMPT="This is the automated scheduled run of the Weekly NWA Briefing (NOT a manual run) — \
either the regular Friday 6 PM run or a weekend catch-up after a failed Friday. \
Read $SKILL and follow it end-to-end, including Step 7 (commit, push, notify). \
Use today's actual date for all file naming."

{
  echo "===== Weekly NWA Briefing run: $STAMP ====="
  echo "PATH=$PATH"
  echo "claude: $(command -v claude || echo NOT-FOUND)"
  echo "----- claude output -----"
} >> "$LOG"

MAX_ATTEMPTS=3
ATTEMPT=0
STATUS=1

while [ $ATTEMPT -lt $MAX_ATTEMPTS ] && [ $STATUS -ne 0 ]; do
  ATTEMPT=$((ATTEMPT + 1))
  if [ $ATTEMPT -gt 1 ]; then
    echo "----- retry attempt $ATTEMPT (sleeping 90s after exit $STATUS) -----" >> "$LOG"
    sleep 90
  fi

  claude -p "$PROMPT" \
    --dangerously-skip-permissions \
    --model opus \
    >> "$LOG" 2>&1

  STATUS=$?
  echo "----- claude exit status: $STATUS (attempt $ATTEMPT) -----" >> "$LOG"

  # An expired/revoked OAuth session can't be fixed by retrying — it needs an
  # interactive /login. Bail out immediately with a targeted notification.
  if [ $STATUS -ne 0 ] && tail -20 "$LOG" | grep -q "Not logged in"; then
    echo "----- auth failure detected; retries are pointless -----" >> "$LOG"
    osascript -e "display notification \"Claude Code is logged out — open Claude Code and run /login. The briefing auto-retries Sat & Sun 10 AM.\" with title \"NWA Briefing: LOGIN NEEDED\" sound name \"Basso\"" >> "$LOG" 2>&1
    exit $STATUS
  fi
done

if [ $STATUS -eq 0 ]; then
  echo "$THIS_FRIDAY" > "$STATE_FILE"
fi

# The SKILL's own failure notification (Step 4) runs *inside* the claude process, so it
# never fires if that process crashes outright (API errors, dropped connections, etc.) —
# which is exactly what happened silently for weeks. Fire a local macOS notification here,
# from the wrapper, so a total failure is never invisible.
if [ $STATUS -ne 0 ]; then
  echo "----- all $MAX_ATTEMPTS attempts failed; sending local failure notification -----" >> "$LOG"
  osascript -e "display notification \"Weekly NWA Briefing run failed after $MAX_ATTEMPTS attempts (exit $STATUS). Auto-retry Sat & Sun 10 AM. See $LOG\" with title \"NWA Briefing FAILED\" sound name \"Basso\"" >> "$LOG" 2>&1
fi

exit $STATUS
