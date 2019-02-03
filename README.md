# Payroll API test

Public API to report payrolls and allow to modify IRPF of them. 

## Prerequisites

- Node.js and npm installed
- MongoDB instance running in `localhost:27017`

## Installation

```bash
git clone https://github.com/jfrac/payroll-api.git
cd payroll-api
npm install
```

## Run API

`npm start`

## Load monthly payslips

In order to load one month into database, just run

`node load-month-payslips 12 2018`

## Run tests

`npm t`

## Usage examples

### Retrieve payrolls of Dec 2018

```bash
curl -X GET \
  'http://localhost:3000/payrolls?month=12&year=2018' \
  -H 'cache-control: no-cache'

```

### Modify IRPF payrolls of Dec 2018

```bash
curl -X PUT \
  'http://localhost:3000/payrolls?month=12&year=2018' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"irpf": 5
}
'
```
