PROJECTROOT=../../examples/vic-gov-au
if [ "$1" != "" ]; then
  PROJECTROOT=$1
fi
echo "PROJECTROOT = $PROJECTROOT"
# Clean test folders
rm -Rf template/_tests/_common/test/e2e/*
rm -Rf template/_tests/_modules/test/e2e/integration/core-modules
rm -Rf template/_tests/_modules/test/e2e/fixtures
# Copy in folders from example app
cp -R $PROJECTROOT/test/e2e/ template/_tests/_common/test/e2e/
mv template/_tests/_common/test/e2e/integration/core-modules template/_tests/_modules/test/e2e/integration/core-modules
mv template/_tests/_common/test/e2e/fixtures template/_tests/_modules/test/e2e/fixtures
# Move snippets back
mkdir -p template/_tests/_common/test/e2e/fixtures/snippets
mv template/_tests/_modules/test/e2e/fixtures/snippets/* template/_tests/_common/test/e2e/fixtures/snippets/
