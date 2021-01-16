#!/bin/bash

sqlite3 petahsaurus.db < schema.sql
sqlite3 petahsaurus.db < data.sql
