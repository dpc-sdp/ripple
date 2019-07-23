for path in examples/*; do
  [ -d "${path}" ] || continue # if not a directory, skip
  
  cd ${path} && yarn run dev
  cd ../../
done