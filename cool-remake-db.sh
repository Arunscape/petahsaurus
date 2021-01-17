#!/bin/bash

rm -f petahsaurus.db
#sqlite3 petahsaurus.db < schema.sql
sqlite3 petahsaurus.db < output.sql
