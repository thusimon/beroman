#!/bin/sh

# crontab -e
# run every day 00:30
# 30 0 * * *  <absolute path>/beroman/scripts/scrape_task.sh
cd ~/beroman
MONGO_URL="<mongodb service url>" python3 -m server.parse_current_date>>~/beroman/logs/log-$(date +"%m-%d-%Y").log 2>&1
