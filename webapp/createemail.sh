#!/bin/bash

FROM=$1
TO=$2
SUBJECT=$3
#test location
LOCATION=/Users/AJ87/emails
#aws server location
#LOCATION=/var/www/html/emails
FILE2=$LOCATION/emails/${TO}.txt
APOSTROPHE="'"
BODY="${4//0x27/$APOSTROPHE}"
LOG=$LOCATION/emails.log
ERRORLOG=$LOCATION/error.log

if [ -f "$FILE2" ]
then
  FILE=$LOCATION/emails/${TO}_duplicate.txt
  echo "$FILE" >> $ERRORLOG
else
  FILE=$LOCATION/emails/${TO}.txt
fi

echo "Create email for $FILE" >> $LOG

{ echo "FROM: $FROM";
echo "TO: $TO";
echo "SUBJECT: $SUBJECT";
echo "Mime-Version: 1.0";
echo "Content-Type: text/html";
echo "";
echo "$BODY"; } > "$FILE"
