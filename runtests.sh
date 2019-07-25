for path in examples/*; do
  [ -d "${path}" ] || continue # if not a directory, skip
  yarn run cross-env NODE_ENV=test start-server-and-test "'cd $path && yarn start:build'" 3000 "'cy:run-smoke --project ${path}/test/e2e'"
done