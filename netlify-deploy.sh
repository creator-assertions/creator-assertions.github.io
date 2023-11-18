#!/bin/bash

set -e

git config --global credential.helper store

echo https://scouten-adobe:$GITHUB_TOKEN@github.com > ~/.git-credentials

npm install

npx antora antora-playbook.yml
