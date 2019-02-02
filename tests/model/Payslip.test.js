const chai = require('chai');
const {Payslip} = require('../../src/model/Payslip');
const expect = chai.expect;

describe('Payslip model', function() {
  it('IRPF changes correctly', function() {
    const date = new Date();
    const payslip = new Payslip({
        id: 234234234,
        vat: '123123S',
        gross: 2012,
        date,
        deductions: 4,
        amountDeductions: 544,
        irpf: 12,
        amountIrpf: 241.44,
        net: 1226.56,
    });
    payslip.changeIrpf(11);
    expect(payslip.toJSON()).to.deep.equal({
        id: 234234234,
        vat: '123123S',
        gross: 2012,
        date,
        deductions: 4,
        amountDeductions: 544,
        irpf: 11,
        amountIrpf: 221.32,
        net: 1246.68,
    });
  });
});
