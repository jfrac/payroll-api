class Payslip {
    constructor(data) {
        this.id = data.id;
        this.vat = data.vat;
        this.date = data.date;
        this.gross = data.gross;
        this.deductions = data.deductions;
        this.amountDeductions = data.amountDeductions;
        this.irpf = data.irpf;
        this.amountIrpf = data.amountIrpf;
        this.net = data.net;
    }

    changeIrpf(newIrpf) {
        this.irpf = parseFloat(newIrpf);
        if (this.irpf < 0) throw new IrfpNegativeError();
        this.amountIrpf = this.gross * (this.irpf / 100)
        this.net = this.gross - this.amountIrpf - this.amountDeductions;
    }

    toJSON() {
        return {
            id: this.id,
            vat: this.vat,
            date: this.date,
            gross: this.gross,
            deductions: this.deductions,
            amountDeductions: this.amountDeductions,
            irpf: this.irpf,
            amountIrpf: this.amountIrpf,
            net: this.net.toFixed(2),
        };
    }
}

class IrfpNegativeError {
    constructor(message = 'IRPF must be positive', extra) {
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.extra = extra;
    }
}

module.exports = {
    Payslip,
    IrfpNegativeError
}
