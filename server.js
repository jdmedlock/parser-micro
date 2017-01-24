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
    const requestIPs = request.ip.split(":");
    const ipAddr = requestIPs[requestIPs.length - 1];

    response.send(JSON.stringify({
      "ipaddress": ipAddr,
      "language": request.headers["accept-language"],
      "software": softwareSpec
    }));
});

app.listen(app.get("port"), function() {
    console.log("Timestamp Microservice app listening on port ", app.get("port"), "!");
});
