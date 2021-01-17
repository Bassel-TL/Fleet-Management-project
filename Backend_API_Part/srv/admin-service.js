  
const cds = require('@sap/cds')
const { Ride } = cds.entities
const { Cities } = cds.entities
const { Member } = cds.entities
const { Requests } = cds.entities
const { EnRouteCities } = cds.entities
const { Chitchat } = cds.entities
const { Music } = cds.entities
const { Luggage } = cds.entities
const { Review } = cds.entities

const cors = require("cors");
var express = require('express')
var sap = express()
sap.use(cors());



