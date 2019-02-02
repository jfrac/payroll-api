const updateIrpf = (month, year, newIrpf, payslipRepository) => {
    return new Promise((resolve, reject) => {
        payslipRepository.findByMonthAndYear(month, year)
        .then(payslips => {
            payslips.forEach(payslip => { payslip.changeIrpf(newIrpf); });
            payslipRepository.updateMany(payslips);
            resolve();
        })
        .catch(reject);
    })
}

module.exports = {
    updateIrpf
}
