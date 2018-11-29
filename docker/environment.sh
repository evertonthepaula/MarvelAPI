#!/bin/bash

[ -z "$1" ] && DIR=$PWD || DIR=$1 

docker run --name mapi-container \
-w /mapi \
--network host \
-v $DIR/:/mapi/  \
-v ~/.ssh/:/root/.ssh/ \
-it --rm mapi-environment bash
