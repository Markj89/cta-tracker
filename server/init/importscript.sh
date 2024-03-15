#!/bin/bash

mongoimport --db='ctaTrackerDB' --collection='stations' --file='/tmp/testdata.json' --jsonArray --username='root' --password='root' --authenticationDatabase=admin