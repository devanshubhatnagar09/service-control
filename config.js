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
    if (message === 'Command executed successfully') {
      let toggle = true;
      setInterval(() => {
      document.title = toggle ? 'Build Completed' : 'Service Control';
      toggle = !toggle;
      }, 1000);
    }
      toggle = false;
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

function clearLogs() {
  document.getElementById('message').innerHTML = '';
  localStorage.setItem('message', '');
}
function toastify (textToShow) {
  const toast = document.createElement('div');
  toast.textContent = textToShow;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = 'linear-gradient(to right, #00b09b, #96c93d)';
  toast.style.color = 'white';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.zIndex = '1000';
  document.body.appendChild(toast);
  
  setTimeout(() => {
      document.body.removeChild(toast);
  }, 3000);
}
function downloadLogs() {
  const logs = localStorage.getItem('message');
  if(logs) {
  const blob = new Blob([logs], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'logs.txt';
  link.click();
  } else {
  document.getElementById('downloadLogsButton').disabled = true;
  document.getElementById('downloadLogsButton').style.cursor = 'not-allowed';
  }
}