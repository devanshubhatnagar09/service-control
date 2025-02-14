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
function toggleSelectAll(selectAllCheckbox) {
  const checkboxes = document.querySelectorAll('input[name="serviceName"]');
  checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
  });
}
document.addEventListener('DOMContentLoaded', (event) => {
  let currentLogs = localStorage.getItem('message');
  if (!currentLogs) {
      localStorage.setItem('message', "");
      currentLogs = "";
  }
  if (currentLogs) {
      const messageContainer = document.getElementById('message');
      const logDiv = document.createElement('div');
      logDiv.id = 'logs-line';
      logDiv.innerHTML = `
      <pre style="white-space: pre-wrap; word-wrap: break-word;">${currentLogs}</pre>`;
      messageContainer.appendChild(logDiv);
  }
  const socket = io();
  socket.on('message', (message) => {
      currentLogs = localStorage.getItem('message') || '';
      currentLogs += `${message} \n`;
      localStorage.setItem('message', currentLogs);
      const messageContainer = document.getElementById('message');
      const logDiv = document.createElement('div');
      logDiv.id = 'logs-line';
      logDiv.innerHTML = `
      <pre style="white-space: pre-wrap; word-wrap: break-word;">${message}</pre>`;
      messageContainer.appendChild(logDiv);
  });
});
