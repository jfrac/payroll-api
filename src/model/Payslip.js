class Payslip {
    constructor(
        id,
        vat,
        date,
        gross,
        deductions,
        amountDeductions,
        irpf,
        amountIrpf,
        net
    ) {
        this.id = id;
        this.vat = vat;
        this.date = date;
        this.gross = gross;
        this.deductions = deductions;
        this.amountDeductions = amountDeductions;
        this.irpf = irpf;
        this.amountIrpf = amountIrpf;
        this.net = net;
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