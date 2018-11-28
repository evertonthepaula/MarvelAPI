#!/bin/bash
set -e 

echo  -e "####################################"
echo  -e "Build dist!"
echo  -e "####################################"

npm run build-production
cd dist

echo  -e "####################################"
echo  -e "Push!"
echo  -e "####################################"

git init
git config user.name "Travis CI"
git config user.email "travisci@gmail.com"
git add .
git commit -m "Travis CI - Deploy to GitHub Pages"
git push -f -q "https://${GH_TOKEN}@github.com/evertonthepaula/marvel.github.io" master:gh-pages > /dev/null 2>&1

cd ..