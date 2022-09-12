rm -rf lib

mkdir lib

typespath=${PACKAGE_SOURCE:-../../services/backend/src/apiTypes}
targetdir=lib

for typefile in `ls $typespath`; do
  cp $typespath/$typefile "${targetdir}/${typefile%.*}.d.ts"
done
