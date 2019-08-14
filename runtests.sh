for path in examples/*; do
  [ -d "${path}" ] || continue # if not a directory, skip
  TESTSCRIPT=test:smoke
  if [ "$1" != "" ]; then
    TESTSCRIPT=$1
    echo "TESTSCRIPT = $TESTSCRIPT"
  fi
  cd $path && yarn run $TESTSCRIPT
done