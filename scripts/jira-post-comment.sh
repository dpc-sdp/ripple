#!/bin/sh
##
# Post comment with deployment URL to JIRA.
#

JIRA_URL=$1
USER=$2
PASSWORD=$3
BRANCH=$4
PREFIX=$5
PR=$6
PR_TITLE=$7

extract_issue() {
  local prefix=$1
  local branch=$(echo $2 | tr '[:upper:]' '[:lower:]')
  local title=$(echo $3 | tr '[:upper:]' '[:lower:]')
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

ISSUE=$(extract_issue $PREFIX "$BRANCH" "$PR_TITLE")
[ "$ISSUE" == "" ] && echo "Branch does not contain issue number" && exit 0

COMMENT="Deployed to https://storybook-ripple-$PR.lagoon.vicsdp.amazee.io "

echo "Posting comment \"$COMMENT\" for issue \"$ISSUE\""

DATA="{'body': $COMMENT}"
curl -s -u $USER:$PASSWORD -X POST --data "$(generate_data)" -H "Content-type: application/json" "$JIRA_URL/rest/api/2/issue/$ISSUE/comment"
