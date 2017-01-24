// File name: server.js
// Date: 01/22/2017
// Programmer: Jim Medlock
//
// freeCodeCamp Backend Certificate API Project - Request Header Parser Microservice
//
// Objective: Build a full stack JavaScript app that is functionally similar
// to this: https://cryptic-ridge-9197.herokuapp.com/api/whoami/
// and deploy it to Heroku.
//
// The ougput should be a JSON string similar to the following:
//
//    {"ipaddress":"97.91.210.51",
//     "language":"en-us",
//     "software":"Macintosh; Intel Mac OS X 10_12_2"}
//
// Note that for each project, you should create a new GitHub repository and
// a new Heroku project. If you can't remember how to do this, revisit
// https://freecodecamp.com/challenges/get-set-for-our-api-development-projects.
//
// User Story: I can get the IP address, language and operating system for
//             my browser.
//
"use strict";
const express = require("express");
const path = require('path');
const url = require("url");
const app = express();

// -------------------------------------------------------------
// Express UI function(s)
// -------------------------------------------------------------

app.set("port", (process.env.PORT || 5000));

app.get("/", function(request, response) {

//    let tsMicroService = new TsMicroService(query);
    const userAgentData = request.headers["user-agent"];
    const softwareSpec = userAgentData.match(/\(.+?\)/g)[0].replace(/\(|\)/g,"");

    response.send(JSON.stringify({
      "ipaddress": request.headers["host"],
      "language": request.headers["accept-language"],
      "software": softwareSpec
    }));
});

app.listen(app.get("port"), function() {
    console.log("Timestamp Microservice app listening on port ", app.get("port"), "!");
});


// -------------------------------------------------------------
// Request Header Parser Microservice Class Definition
// -------------------------------------------------------------
class ParserMicroService {
    // Construct a new TsMicroService object instance. The input
    // value will be checked to see if it is a Unix timestamp or
    // a natural language date string. Unique class variables
    // will be initialized to contain both, with the unknown value
    // being constructed from the known value.
    //
    // For example, if a natural language date is passed the Unix
    // timestamp will be constructed from it and vice versa.
    //
    // If an invalid value is passed both class variables will be
    // set to null.
    //
    // Returns: New object instance
    constructor(inputValue) {
        this.nlDate = null;
        this.unixTs = null;

        if (this.isNlDate(inputValue)) {
           this.nlDate = inputValue;
           this.unixTs = this.toUnixTs();
        } else if (this.isUnixTs(inputValue)) {
           this.unixTs = Number(inputValue);
           this.nlDate = this.toNlDate();
        }
    }
    // Check an input value to see if it is a natural language date
    //
    // Returns: true - dateValue is a valid natural language date
    //          false - dateValue is not a natural language date
    isNlDate(inputValue) {
        const date = moment(inputValue, "MMMM D, YYYY", true);
        return date.isValid();
    }
    // Check an input value to see if it is a Unix timestamp
    //
    // Returns: true - timeValue is a valid Unix timestamp
    //          false - timeValue is not a Unix timestamp
    isUnixTs(inputValue) {
      const timestamp = moment(inputValue, "x", true);
      return timestamp.isValid();
    }
    // Convert a Unix timestamp to a natural language date string
    //
    // Returns: date - natural language date string
    toNlDate() {
        const date = moment(this.unixTs).format("MMMM DD, YYYY");
        return date;
    }
    // Convert a Unix timestamp to a natural language date string
    //
    // Returns: timeValue - Unix time string
    toUnixTs() {
      const timestamp = moment(this.nlDate).format("x");
      return timestamp;
    }
}
