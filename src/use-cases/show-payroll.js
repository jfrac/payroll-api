const showPayroll = (month, year, payslipRepository) => {
    return new Promise((resolve, reject) => {
        payslipRepository.findByMonthAndYear(month, year)
            .then(payslips => {
                const payroll = payslips.map(payslip => {
                    return {
                        vat: payslip.vat,
                        irpf: payslip.irpf,
                        net: payslip.net
                    }
                });
                resolve(payroll);
            })
            .catch(reject);
    })
};

module.exports = {
    showPayroll
}
