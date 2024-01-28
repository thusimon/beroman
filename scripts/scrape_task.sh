#!/bin/sh

# crontab -e
# run the first day at 00:30 every month
# 30 0 1 * *  <absolute path>/beroman/scripts/scrape_task.sh
cd ~/beroman
MONGO_URL="<mongodb service url>" python3 -m server.parse_current_date>>~/beroman/logs/log-$(date +"%m-%d-%Y").log 2>&1
