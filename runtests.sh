root=`pwd`
TESTSCRIPT=test:smoke
if [ "$1" != "" ]; then
  TESTSCRIPT=$1
  echo "TESTSCRIPT = $TESTSCRIPT"
fi

for path in examples/*; do
  [ -d "${root}/${path}" ] || continue # if not a directory, skip
  cd "${root}/${path}" && yarn run $TESTSCRIPT
  cd $root
done
