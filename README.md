# Start Generation Here
## Path Location of Service Controller

To set up the Service Controller, follow these steps:

1. Open Terminal.

2. Navigate to the Documents directory:
   ```bash
   cd ~/Documents
   ```

3. Clone the repository:
   ```bash
   git clone https://github.com/devanshubhatnagar09/service-control.git
   ```

4. Change to the new-service-upservice branch:
   ```bash
   git checkout new-service-upservice
   ```

5. Pull the latest changes from the remote branch:
   ```bash
   git pull origin new-service-upservice
   ```

6. Start the services using Docker Compose:
   ```bash
   docker-compose -f docker-compose-mac.yml --compatibility up --build -d
   ```
# End Generation Here
