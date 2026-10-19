#!/bin/bash

mongoimport --db='stations' --collection='Stations' --file='/tmp/testdata.json' --jsonArray --username='root' --password='root' --authenticationDatabase=admin