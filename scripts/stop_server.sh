#!/bin/bash
pid=$(ps aux | grep ts-node | grep -v grep | awk '{print $2}')
if [ ! -z "$pid" ]; then
  kill -9 $pid
fi
pid=$(lsof -i:8080 | awk '{print $2}')
if [ ! -z "$pid" ]; then
  kill -9 $pid
fi