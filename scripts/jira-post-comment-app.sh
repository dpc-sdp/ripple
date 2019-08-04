#!/bin/sh
##
# Post comment with deployment URL to JIRA.
#

JIRA_URL=$1
USER=$2
PASSWORD=$3
BRANCH=$4
PR=$5
PR_TITLE=$6

extract_issue() {
  local prefix=$(echo $branch|sed -n "s/feature\/\([a-zA-Z]\{1,\}\).*/\1/p")
  local branch=$(echo $1 | tr '[:upper:]' '[:lower:]')
  local title=$(echo $2 | tr '[:upper:]' '[:lower:]')
  # Extracting from branch.
  local issue=$(echo $branch|sed -n "s/feature\/\($prefix-[0-9]\{1,\}\).*/\1/p")
  if [ "$issue" == "" ]; then
    # Extracting from title.
    issue=$(echo $title|sed -n "s/.*\($prefix-[0-9]\{1,\}\).*/\1/p")
  fi
  echo $issue
}

generate_data() {
  cat <<EOF
  {
    "body": "$COMMENT"
  }
EOF
}

ISSUE=$(extract_issue "$BRANCH" "$PR_TITLE")
[ "$ISSUE" == "" ] && echo "Branch does not contain issue number" && exit 0

COMMENT="Deployed to https://app-ripple-$PR.lagoon.vicsdp.amazee.io "

echo "Posting comment \"$COMMENT\" for issue \"$ISSUE\""

DATA="{'body': $COMMENT}"
curl -s -u $USER:$PASSWORD -X POST --data "$(generate_data)" -H "Content-type: application/json" "$JIRA_URL/rest/api/2/issue/$ISSUE/comment"
