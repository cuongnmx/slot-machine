#!/bin/sh

rm -rf dist || exit 0;
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  mkdir dist;
  ( cd dist
    git init
    git config user.name "sarbbottam"
    git config user.email "sarbbottam@gmail.com"
    cp ../example/index.html ./index.html
    cp ../example/main.css ./main.css
    cp ../example/drink.png ./drink.png
    cp ../example/drink-main.png ./drink-main.png
    cp ../example/drink-filter.png ./drink-filter.png
    cp ../example/drink-machine.png ./drink-machine.png
    cp ../example/fruit.png ./fruit.png
    cp ../example/main.js ./main.js
    git add .
    git commit -m "initial commit"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
  )
else
   echo "not publising to gh-pages"
fi
