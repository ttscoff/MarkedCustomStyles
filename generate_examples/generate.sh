#!/bin/bash
rm -fr out
mkdir out

FILES=../*.css
for f in $FILES
do
  name=$(basename "$f" .css)
  outname="out/${name}.html"
  cp example.html "$outname"

  # Set this css in the filename
  sed -i -e "s/&&&/$name/g" "$outname"
  rm "$outname-e" # An I using Sed wrong!?
done