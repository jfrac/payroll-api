const updateIRPF = (month, year, newIrpf, payslipRepository) => {
    const payslips = payslipRepository.findByMonthAndYear(month, year);
    payslips.forEach(payslip => { payslip.changeIrpf(newIrpf); })
    payslipRepository.updateMany(payslips);
}

module.exports = {
    updateIRPF
}
