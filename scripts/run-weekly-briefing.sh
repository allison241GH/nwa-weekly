#!/bin/zsh
#
# run-weekly-briefing.sh — unattended generator for the Weekly NWA Briefing.
#
# Invoked by the launchd agent ai.lvng.nwa-weekly-briefing every Friday at 6:00 PM ET
# (or on next wake if the Mac is asleep). Runs Claude Code headlessly in full-bypass
# mode so no tool ever prompts, then commits + pushes so Vercel rebuilds the site.
#
# To test by hand:  zsh /Users/jamie/ClaudeCodeProjects/nwa-weekly/scripts/run-weekly-briefing.sh

set -u

REPO="/Users/jamie/ClaudeCodeProjects/nwa-weekly"
SKILL="/Users/jamie/.claude/scheduled-tasks/nwa-weekly-briefing/SKILL.md"
LOG_DIR="/Users/jamie/.claude/scheduled-tasks/nwa-weekly-briefing/logs"

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

cd "$REPO" || { echo "FATAL: cannot cd to $REPO" >> "$LOG"; exit 1; }

PROMPT="This is the automated Friday scheduled run of the Weekly NWA Briefing (NOT a manual run). \
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
done

# The SKILL's own failure notification (Step 4) runs *inside* the claude process, so it
# never fires if that process crashes outright (API errors, dropped connections, etc.) —
# which is exactly what happened silently for weeks. Fire a local macOS notification here,
# from the wrapper, so a total failure is never invisible.
if [ $STATUS -ne 0 ]; then
  echo "----- all $MAX_ATTEMPTS attempts failed; sending local failure notification -----" >> "$LOG"
  osascript -e "display notification \"Weekly NWA Briefing run failed after $MAX_ATTEMPTS attempts (exit $STATUS). See $LOG\" with title \"NWA Briefing FAILED\" sound name \"Basso\"" >> "$LOG" 2>&1
fi

exit $STATUS
