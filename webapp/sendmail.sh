#!/bin/bash

# test folder
cd /Users/AJ87/emails/emails || exit
# aws server folder
#cd /var/www/html/emails/emails || exit

for f in *.txt;
do
  echo "Processing file $f"
  sendmail -t < "$f"
done
