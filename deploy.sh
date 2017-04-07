#!/bin/bash
# script idea obtained from: http://rhodesmill.org/brandon/2012/quietly-pushing-to-heroku/

set -e

# build /dist
npm run build
npm run build:server

# temporarily add dist/ to version control
git add -f dist/

# push to heroku then remove commit
git commit -m "Temp Heroku deploy commit" -n
git push heroku master --force
git reset --soft HEAD~1

# unstage generated files
git reset HEAD dist/
