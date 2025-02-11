const SERVICE_NAME = [
  "ep-addon",
  "su-crawler",
  "kafka",
  "zookeeper",
  "ep_template",
  "mongo-ep",
  "ah-analytics",
  "citus-worker",
  "citus-manager",
  "citus-master",
  "ml-service",
  "search",
  "crawler",
  "search-client",
  "mongo-search",
  "redis",
  "mysql",
  "opensearch",
  "analytics",
  "frontend",
  "backend",
  "ah-client-backend",
  "ah-client-frontend",
  "migrations",
  "cron-manager",
  "multi-tenant-auth",
  "index-service"
]

const serviceNameContainer = document.getElementById('addService');
SERVICE_NAME.forEach(service => {
    const label = document.createElement('label');
    label.setAttribute('for', service);
    label.innerHTML = `<input type="checkbox" id="${service}" name="serviceName" value="${service}"> ${service}`;
    serviceNameContainer.appendChild(label);
});
