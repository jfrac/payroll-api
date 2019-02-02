const express = require('express');
const bodyParser = require('body-parser');
const {updateIrpf} = require('./src/use-cases/update-irpf');
const {PayslipRepository} = require('./src/infrastructure/persistence/mongodb/payslip');

const app = express()
app.use(bodyParser.json())
const port = 3000
const payslipRepository = new PayslipRepository();

app.get('/payrolls', (req, res) => {
    const { month, year} = req.query;
    if (!month || !year) res.sendStatus(400);
    else payslipRepository.findByMonthAndYear(month, year)
        .then(payslips => {
            res.send(payslips.map(payslip => {
                return {
                    vat: payslip.vat,
                    irpf: payslip.irpf,
                    net: payslip.net
                }
            }));
        });
});

app.put('/payrolls', (req, res) => {
    const { month, year} = req.query;
    const {irpf} = req.body;
    if (!month || !year || !irpf) res.sendStatus(400);
    else {
        updateIrpf(month, year, irpf, payslipRepository);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
