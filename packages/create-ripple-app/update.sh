PROJECTROOT=../../examples/vic-gov-au
if [ "$1" != "" ]; then
  PROJECTROOT=$1
fi
echo "PROJECTROOT = $PROJECTROOT"
# Clean test folders
rm -Rf template/_tests/_common/test/e2e/*
rm -Rf template/_tests/_modules/test/e2e/integration/modules
rm -Rf template/_tests/_modules/test/e2e/fixtures/modules

# Copy in folders from example app
cp -R $PROJECTROOT/test/e2e/ template/_tests/_common/test/e2e/
mv template/_tests/_common/test/e2e/integration/modules template/_tests/_modules/test/e2e/integration/modules
mv template/_tests/_common/test/e2e/fixtures/modules template/_tests/_modules/test/e2e/fixtures/modules

# Replace vic.gov.au with domain var
find template/_tests/_modules/test/e2e/fixtures -name '*.yml' -exec sed -i '' -e 's/vic.gov.au/<%= domain %>/g' {} \;
find template/_tests/_common/test/e2e/fixtures -name '*.yml' -exec sed -i '' -e 's/vic.gov.au/<%= domain %>/g' {} \;
