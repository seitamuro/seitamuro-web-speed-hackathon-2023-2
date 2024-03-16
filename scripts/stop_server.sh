#!/bin/bash
pid = ps aux | grep ts-node | grep -v grep | awk '{print $2}'