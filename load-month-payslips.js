const {loadPaylips} = require('./src/infrastructure/payslip-loaders/payslip-gist-loader');
const {Payslip} = require('./src/model/Payslip');
const {PayslipRepository, disconnect} = require('./src/infrastructure/persistence/mongodb/payslip');

const payslipRepository = new PayslipRepository();
const curDate = new Date();
let month = curDate.getMonth();
let year = curDate.getFullYear();

if (parseInt(process.argv[2]) && parseInt(process.argv[3])) {
    month = process.argv[2];
    year = process.argv[3];
}

savePayslip = (jsonPayslip) => {
    var payslip = new Payslip(jsonPayslip);
    payslipRepository.save(payslip)
        .then(disconnect)
        .catch(err => {
            console.error(err);
            disconnect();
        });
};

loadPaylips(month, year).then(payslips => payslips.map(savePayslip));
