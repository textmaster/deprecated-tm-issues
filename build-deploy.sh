#!/bin/bash

docker build . -f ./Dockerfile-build -t tm-issues-build

mkdir -p ./tmp

docker run --rm --entrypoint tar tm-issues-build:latest czf - /opt/app/ > ./tmp/app.tgz

docker build . -f ./Dockerfile-deploy -t tm-issues-deploy

rm -rf ./tmp
