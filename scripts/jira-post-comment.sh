#!/bin/sh
##
# Post comment with deployment URL to JIRA.
#

JIRA_URL=$1
USER=$2
PASSWORD=$3
BRANCH=$4
LAGOON_ROUTE=$5
PR_TITLE=$6

# Extract ticket issue e.g. DDIDO-200
extract_issue() {
  local prefix=$(echo $1|sed -nE "s/(feature|hotfix)\/([A-Z]+).*/\2/p")
  local issue=$(echo $1|sed -nE "s/(feature|hotfix)\/($prefix-[0-9]+).*/\2/p")
  if [ "$issue" == "" ]
  then
    issue=$(echo $2|sed -nE "s/.*($prefix-[0-9]+).*/\1/p")
  fi
  echo $issue
}

# Extract board that ticket belongs to e.g. DDIDO
extract_board() {
  echo $1 | sed -nE "s/([A-Z]+).*/\1/p"
}

ISSUE=$(extract_issue "$BRANCH" "$PR_TITLE")
[ "$ISSUE" == "" ] && echo "Branch does not contain issue number" && exit 0
BOARD=$(extract_board "$ISSUE")

COMMENT="Deployed to $LAGOON_ROUTE"

echo "Posting comment \"$COMMENT\" for issue \"$ISSUE\""

if [ "$BOARD" == "SDPSUP" ]
then
  # Use service desk API if support ticket in order to make internal comment
  DATA="{\"body\": \"$COMMENT\", \"public\": false}"
  curl -s -u $USER:$PASSWORD -X POST --data "$DATA" -H "Content-type: application/json" "${JIRA_URL}rest/servicedeskapi/request/$ISSUE/comment"
else
  # Use universal Jira API for every other ticket
  DATA="{\"body\": \"$COMMENT\"}"
  curl -s -u $USER:$PASSWORD -X POST --data "$DATA" -H "Content-type: application/json" "${JIRA_URL}rest/api/2/issue/$ISSUE/comment"
fi
