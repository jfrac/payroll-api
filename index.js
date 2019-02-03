const express = require('express');
const bodyParser = require('body-parser');
const {updateIrpf} = require('./src/use-cases/update-irpf');
const {showPayroll} = require('./src/use-cases/show-payroll');
const {PayslipRepository} = require('./src/infrastructure/persistence/mongodb/payslip');

const app = express()
app.use(bodyParser.json())
const port = 3000
const payslipRepository = new PayslipRepository();

app.get('/payrolls', (req, res) => {
    const { month, year} = req.query;
    if (!month || !year) res.sendStatus(400);
    else showPayroll(month, year, payslipRepository)
        .then((payroll) => { res.send(payroll); })
        .catch(() => res.sendStatus(500))
});

app.put('/payrolls', (req, res) => {
    const { month, year} = req.query;
    const {irpf} = req.body;
    if (!month || !year || !irpf) res.sendStatus(400);
    else {
        updateIrpf(month, year, irpf, payslipRepository)
            .then(() => res.sendStatus(204))
            .catch(() => res.sendStatus(500));
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
