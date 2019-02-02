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
        this.irpf = newIrpf;
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
            net: this.net,
        };
    }
}

module.exports = {
    Payslip
}