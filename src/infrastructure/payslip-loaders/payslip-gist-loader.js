'use strict';

var https = require('https');
var URL_BASE = 'https://gist.githubusercontent.com/rodrigm/bf42bf2aa0f1d17381b412a3ffec7fd9/raw/3997a797e334d19e8ef3fb853cf474b22237522d/';

var loadPaylips = (month, year) => new Promise((resolve, reject) => {
  var fileName = `payslips.${year}${month}.txt`;
  var uri = URL_BASE + fileName;
  var data = '';
  https.get(uri, response => {
    response.on('data', d => data += d);
    response.on('end', () => resolve(parsePayslips(data)));
    response.on('error', d => console.log);
  });
});

var parsePayslips = (gitsResult) => {
  return gitsResult.split('\n').map(parsePaylip);
};

var parsePaylip = (gitsLine) => {
  /*
     12 chars 👉 ID
     9 chars 👉 Vat
     8 chars 👉 Date (Format: YYYYMMDD)
     8 chars 👉 Gross (6 integers + 2 decimals)
     4 chars 👉 % Deductions (2 integers + 2 decimals)
     8 chars 👉 Amount of deductions (6 integers + 2 decimals)
     4 chars 👉 % IRPF (2 integers + 2 decimals)
     8 chars 👉 Amount IRPF (6 integers + 2 decimals)
     8 chars 👉 Net (6 integers + 2 decimals)
  */
  const payslipRegex = /(.{12})(.{9})(.{8})(.{8})(.{4})(.{8})(.{4})(.{8})(.{8})/;
  var [,
    id,
    vat,
    rawDate,
    gross,
    deductions,
    amountDeductions,
    irpf,
    amountIrpf,
    net,
  ] = payslipRegex.exec(gitsLine);
  return {
    id,
    vat,
    date: parseDate(rawDate),
    gross: parseStringFloat(gross, 6, 2),
    deductions: parseStringFloat(deductions, 2, 2),
    amountDeductions: parseStringFloat(amountDeductions, 6, 2),
    irpf: parseStringFloat(irpf, 2, 2),
    amountIrpf: parseStringFloat(amountIrpf, 6, 2),
    net: parseStringFloat(net, 6, 2),
  };
};

var parseStringFloat = (sFloat, nInt, nDec) => {
  return parseFloat(sFloat.substr(0, nInt)) +
    parseFloat('0.' + sFloat.substr(nInt, nDec));
};

var parseDate = (rawDate) => {
  // rawDate format: YYYYMMDD
  var date = new Date();
  date.setFullYear(rawDate.substr(0, 4));
  date.setMonth(rawDate.substr(4, 2) - 1); // -1 because months start from 0 in Date
  date.setDate(rawDate.substr(6, 2));
  date.setHours(1, 1, 1);
  return date;
};

module.exports = {
  loadPaylips,
};
