const updateIrpf = (month, year, newIrpf, payslipRepository) => {
    payslipRepository.findByMonthAndYear(month, year)
        .then(payslips => {
            payslips.forEach(payslip => { payslip.changeIrpf(newIrpf); });
            payslipRepository.updateMany(payslips);
        });
}

module.exports = {
    updateIrpf
}
