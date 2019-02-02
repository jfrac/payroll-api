const mongoose = require('mongoose');
const moment = require('moment');
const {Payslip} = require('../../../model/Payslip');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/payroll-api', {useNewUrlParser: true});

const disconnect = () => mongoose.disconnect();

const payslipSchema = new mongoose.Schema({
    _id: String,
    vat: String,
    date: {type: [Date], index: true},
    gross: Number,
    deductions: Number,
    amountDeductions: Number,
    irpf: Number,
    amountIrpf: Number,
    net: Number
}, { autoIndex: false });

const MongoPayslip = mongoose.model('Payslip', payslipSchema);

class PayslipRepository {
    constructor() {
        this.save.bind(this);
        this.updateMany.bind(this);
    }

    fromPayslip(payslip) {
        const ObjectId = mongoose.Types.ObjectId;
        const dbModel = MongoPayslip(
            Object.assign({ _id: ObjectId(payslip.id)}, payslip.toJSON())
        );
        return dbModel;
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
        return new Promise((resolve) => {
            MongoPayslip.bulkWrite(payslips.map((payslip => {
                const mongoPayslip = this.fromPayslip(payslip);
                return {
                    updateOne: {
                      filter: { _id: mongoPayslip.id },
                      update: mongoPayslip.toJSON()
                    }
                  }
            }))).then(resolve)
        })
    }
}

module.exports = {
    PayslipRepository,
    disconnect
}
