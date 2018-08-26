#!/bin/bash

ssh opendatamap@$sshHOST -p $sshPORT <<EOF
  ~/opendatamap-develop-update.sh
EOF
