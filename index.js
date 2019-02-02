const express = require('express')
const {loadPaylips} = require('./src/payslip-loaders/payslip-gist-loader');
const {updateIrpf} = require('./src/use-cases/update-irpf');
const {PayslipRepository} = require('./src/infrastructure/persistence/mongodb/payslip');

const app = express()
const port = 3000
const payslipRepository = new PayslipRepository();

app.get('/payrolls', (req, res) => {
    const { month, year} = req.query;
    if (!month || !year) res.sendStatus(400);
    loadPaylips(month, year).then(payslips => {
        res.send(payslips)
    })
});

app.put('/payrolls', (req, res) => {
    const { month, year} = req.query;
    if (!month || !year) res.sendStatus(400);
    updateIrpf(month, year, newIrpf, payslipRepository);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
