#!/bin/sh
##
# Create Release Pull request
# NOTE: This does not publish to NPM - that will be done from CI on successful merge to master branch
#
RELEASE_TAG=$1

git fetch
git checkout master
git pull origin master
git checkout develop
git pull origin develop
git stash
git reset
git flow release start "${RELEASE_TAG}"
npx lerna bootstrap
npx lerna version "${RELEASE_TAG}" --no-git-tag-version --no-push --yes
git commit -am "Update to Release ${RELEASE_TAG}"
git push origin release/${RELEASE_TAG}
gh pr create --fill --reviewer dpc-sdp/dpc-frontend -B master
echo ""
echo "When Pull Request has been reviewed run the following command :"
echo "GIT_MERGE_AUTOEDIT=no git flow release finish -m 'Release ${RELEASE_TAG}' ${RELEASE_TAG}"
echo "git push origin develop --no-verify"
echo "git push origin master --no-verify"
echo "git push origin v1.2.0 --no-verify"