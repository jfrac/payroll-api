const mongoose = require('mongoose');
const moment = require('moment');
const {Payslip} = require('../../../model/Payslip');

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

const MongoPayslip = mongoose.model('Payslip', payslipSchema);

class PayslipRepository {
    constructor() {
        this.save.bind(this);
    }

    fromPayslip(payslip) {
        return MongoPayslip(payslip.toJSON());
    }

    findByMonthAndYear(month, year) {
        const from = moment([year, month - 1]);
        const to = moment([year, month - 1]).endOf('month');
        return MongoPayslip.find({'date': {     
            $gte: from,     
            $lt : to
        }}).then(jsonPayslips => {
            return new Promise((resolve) => {
                resolve(jsonPayslips.map(jsonPayslip => {
                    return new Payslip(jsonPayslip);
                }))
            })
        });
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
        const mongoPayslips = payslips.map(payslip => new MongoPayslip(payslip.toJSON()))
        MongoPayslip.collection.updateMany(mongoPayslips, function (err, docs) {
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
