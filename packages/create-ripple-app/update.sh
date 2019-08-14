# Clean test folders
rm -Rf template/_tests/_common/test/e2e/*
rm -Rf template/_tests/_modules/test/e2e/integration/core-modules
rm -Rf template/_tests/_modules/test/e2e/fixtures
# Copy in folders from example app
cp -R ../../examples/vic-gov-au/test/e2e/ template/_tests/_common/test/e2e/
mv template/_tests/_common/test/e2e/integration/core-modules template/_tests/_modules/test/e2e/integration/core-modules
mv template/_tests/_common/test/e2e/fixtures template/_tests/_modules/test/e2e/fixtures
# Move snippets back
mkdir -p template/_tests/_common/test/e2e/fixtures/snippets
mv template/_tests/_modules/test/e2e/fixtures/snippets/* template/_tests/_common/test/e2e/fixtures/snippets/

# Update example content
rm -Rf template/_example
mkdir -p template/_example
mkdir -p template/_example/pages

cp -R ../../examples/vic-gov-au/tide template/_example
cp -R ../../examples/vic-gov-au/plugins template/_example/plugins
cp -R ../../examples/vic-gov-au/components template/_example/components
cp -R ../../examples/vic-gov-au/pages/examples template/_example/pages/examples