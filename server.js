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
    const SERVICE_FOFLDER_NAME = {
        "ep-addon": "escalation-addon/escalation-addon",
        "su-crawler": "micro-services/su-crawler",
        "kafka": "binaries/kafka",
        "zookeeper": "binaries/kafka",
        "ep_template": "escalation-addon/escalation-template",
        "mongo-ep": "escalation-addon/escalation-mongo",
        "ah-analytics": "ah-analytics",
        "citus-worker": "binaries/citus",
        "citus-manager": "binaries/citus",
        "citus-master": "binaries/citus",
        "ml-service": "su-ml-cloud/ml-service",
        "search": "micro-services/search-client",
        "crawler": "micro-services/crawler",
        "search-client": "micro-services/su-custom-search-client",
        "mongo-search": "binaries/mongo-search",
        "redis": "binaries/redis",
        "mysql": "binaries/mysql",
        "opensearch": "binaries/mysql",
        "analytics": "micro-services/analytics",
        "frontend": "micro-services/admin",
        "backend": "micro-services/admin",
        "ah-client-backend": "agent-helper/ah-client-backend",
        "ah-client-frontend": "agent-helper/ah-client-backend",
        "migrations": "micro-services/centralized-migrations",
        "cron-manager": "micro-services/cron-manager",
        "multi-tenant-auth": "micro-services/multi-tenant-auth",
        "index-service": "micro-services/index-service"
    };
    const folder = [];
    const serviceName = req.body.serviceName || [];
    const branchName = req.body.branchName || '';
    const toggle = req.body.toggle ? 'enabled' : 'disabled';
    serviceName.forEach((serviceNameItem,index) => {
        if (SERVICE_FOFLDER_NAME[serviceNameItem]) {
            folder.push(SERVICE_FOFLDER_NAME[serviceNameItem]);
        }
        console.log(`Service Name: ${serviceNameItem}, Branch Name: ${branchName}, Restart Container: ${toggle} , Folder name ${SERVICE_FOFLDER_NAME[serviceNameItem]}`);
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
            console.log('Command executed successfully');
            res.status(200).sendFile(__dirname + '/index.html');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
