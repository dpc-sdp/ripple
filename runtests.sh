for path in examples/*; do
  [ -d "${path}" ] || continue # if not a directory, skip
  STARTSCRIPT=start:build
  TESTSCRIPT=cy:run-smoke
  if [ "$1" != "" ]; then
    STARTSCRIPT=$1
    echo "STARTSCRIPT = $STARTSCRIPT"
  fi
  if [ "$2" != "" ]; then
    TESTSCRIPT=$2
    echo "TESTSCRIPT = $TESTSCRIPT"
  fi
  yarn run cross-env NODE_ENV=test DOTENV_CONFIG_PATH=$path start-server-and-test "'cd $path && yarn $STARTSCRIPT'" 3000 "'$TESTSCRIPT --project ${path}/test/e2e'"
done