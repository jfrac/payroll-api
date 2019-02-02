var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/payroll-api', {useNewUrlParser: true});

const disconnect = () => mongoose.disconnect();

var payslipSchema = new mongoose.Schema({
    id: String,
    vat: String,
    date: {type: Date,},
    gross: Number,
    deductions: Number,
    amountDeductions: Number,
    irpf: Number,
    amountIrpf: Number,
    net: Number
});

var Payslip = mongoose.model('Payslip', payslipSchema);

class PayslipRepository {
    constructor() {
        this.save.bind(this);
    }

    fromPayslip(payslip) {
        return Payslip(payslip.toJSON());
    }

    findByMonthAndYear(month, year) {
        // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
        Payslip.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
            if (err) return handleError(err);
            // Prints "Space Ghost is a talk show host".
            console.log('%s %s is a %s.', person.name.first, person.name.last,
            person.occupation);
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
