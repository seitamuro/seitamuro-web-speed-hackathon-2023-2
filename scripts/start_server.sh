#!/bin/bash
cd /home/ec2-user
nohup ts-node ./src/server/index.ts > ./server.log 2>&1 &