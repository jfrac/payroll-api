const {loadPaylips} = require('./src/infrastructure/payslip-loaders/payslip-gist-loader');
const {Payslip} = require('./src/model/Payslip');
const {PayslipRepository, disconnect} = require('./src/infrastructure/persistence/mongodb/payslip');

const payslipRepository = new PayslipRepository();
const curDate = new Date();
const month = curDate.getMonth();
const year = curDate.getFullYear();

savePayslip = (jsonPayslip) => {
    var payslip = new Payslip(jsonPayslip);
    payslipRepository.save(payslip)
        .then(disconnect)
        .catch(disconnect);
};

loadPaylips(12, 2018).then(payslips => payslips.map(savePayslip));
