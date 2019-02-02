const mongoose = require('mongoose');
const moment = require('moment');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/payroll-api', {useNewUrlParser: true});

const disconnect = () => mongoose.disconnect();

const payslipSchema = new mongoose.Schema({
    id: String,
    vat: String,
    date: Date,
    gross: Number,
    deductions: Number,
    amountDeductions: Number,
    irpf: Number,
    amountIrpf: Number,
    net: Number
});

const Payslip = mongoose.model('Payslip', payslipSchema);

class PayslipRepository {
    constructor() {
        this.save.bind(this);
    }

    fromPayslip(payslip) {
        return Payslip(payslip.toJSON());
    }

    findByMonthAndYear(month, year) {
        const from = moment([year, month - 1]);
        const to = moment([year, month - 1]).endOf('month');
        return Payslip.find({'date': {     
            $gte: from,     
            $lt : to
        }});
    }

    save(payslip) {
        const mongoPayslip = this.fromPayslip(payslip);
        return new Promise((resolve, reject) => {
            mongoPayslip.save(function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    updateMany(payslips) {
        const jsonPayslips = payslips.map(payslip => payslip.toJSON())
        Payslip.collection.updateMany(jsonPayslips, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                console.log('Multiple documents inserted to Collection');
            }
        });
    }
}

module.exports = {
    PayslipRepository,
    disconnect
}
