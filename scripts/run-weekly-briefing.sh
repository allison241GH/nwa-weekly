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
Read $SKILL and follow it end-to-end, including Step 8 (commit, push, notify). \
Use today's actual date for all file naming. If the Google Calendar connector is unavailable, \
note that in Section F and continue — never block or retry."

{
  echo "===== Weekly NWA Briefing run: $STAMP ====="
  echo "PATH=$PATH"
  echo "claude: $(command -v claude || echo NOT-FOUND)"
  echo "----- claude output -----"
} >> "$LOG"

claude -p "$PROMPT" \
  --dangerously-skip-permissions \
  --model opus \
  >> "$LOG" 2>&1

STATUS=$?
echo "----- claude exit status: $STATUS -----" >> "$LOG"
exit $STATUS
