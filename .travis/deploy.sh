#!/bin/bash

ssh opendatamap@$sshHOST -p $sshPORT <<EOF
  ~/opendatamap-update.sh
EOF
