const {loadPaylips} = require('./src/infrastructure/payslip-loaders/payslip-gist-loader');
const {Payslip} = require('./src/model/Payslip');
const {PayslipRepository, disconnect} = require('./src/infrastructure/persistence/mongodb/payslip');

const payslipRepository = new PayslipRepository();
const curDate = new Date();
const month = curDate.getMonth();
const year = curDate.getFullYear();

loadPaylips(12, 2018).then(payslips => {
    payslips.map(jsonPayslip => {
        var payslip = new Payslip(
            jsonPayslip.id,
            jsonPayslip.vat,
            jsonPayslip.date,
            jsonPayslip.gross,
            jsonPayslip.deductions,
            jsonPayslip.amountDeductions,
            jsonPayslip.irpf,
            jsonPayslip.amountIrpf,
            jsonPayslip.net
        );
        payslipRepository.save(payslip)
            .then(() => disconnect());
    })
});
