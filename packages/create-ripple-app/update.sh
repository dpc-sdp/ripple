PROJECTROOT=../../examples/vic-gov-au
if [ "$1" != "" ]; then
  PROJECTROOT=$1
fi
echo "PROJECTROOT = $PROJECTROOT"
# Clean test folders
rm -Rf template/_tests/_common/test/integration/*
rm -Rf template/_tests/_modules/test/integration/fixtures/modules

# Copy in folders from example app
cp -R $PROJECTROOT/test/integration/ template/_tests/_common/test/integration/

# Replace vic.gov.au with domain var
find template/_tests/_modules/test/integration/fixtures -name '*.yml' -exec sed -i '' -e 's/vic.gov.au/<%= domain %>/g' {} \;
find template/_tests/_common/test/integration/fixtures -name '*.yml' -exec sed -i '' -e 's/vic.gov.au/<%= domain %>/g' {} \;
