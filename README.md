# Payslips API test

Public API to report a list of payslips and allow to modify IRPF of them. 

## Prerequisites

- Node.js and npm installed
- MongoDB instance running in `localhost:27017`

## Installation

`npm install`

## Start API

`npm start`



## Load monthly payslips

In order to load one month into database, just run

`node load-month-payslips 12 2018`

## Run tests

`npm t`
