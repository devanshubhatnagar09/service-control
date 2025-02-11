const express = require('express');
const exec = require('child_process').exec;
const app = express();
const PORT = 6996;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/config.js', (req, res) => {
    res.sendFile(__dirname + '/config.js');
});

app.use(express.urlencoded({ extended: true }))
app.post('/', (req, res) => {
    const serviceName = req.body.serviceName || '';
    const branchName = req.body.branchName || '';
    const toggle = req.body.toggle ? 'enabled' : 'disabled';
    serviceName.forEach(serviceNameItem => {
        console.log(`Service Name: ${serviceNameItem}, Branch Name: ${branchName}, Restart Container: ${toggle}`);
    const { spawn } = require('child_process');
    const child = spawn('bash', ['down.sh', branchName, toggle, serviceNameItem]);

    child.stdout.on('data', (data) => {
        console.log(`${serviceNameItem} outputs: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`${serviceNameItem} outputs: ${data}`);
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`Error executing command, exit code: ${code}`);
            return res.status(500).send('Error executing command');
        }
        console.log('Command executed successfully'); // Send a success message instead of the HTML file
        res.status(200).sendFile(__dirname + '/index.html');
    });
});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
