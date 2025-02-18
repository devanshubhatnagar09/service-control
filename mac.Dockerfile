# alpine base image
# Start of Selection
FROM cr.searchunify.com/base-images/node:latest
# End of Selection
WORKDIR /home/service-controller
RUN apk add git
COPY package.json package-lock.json* ./
RUN npm install
COPY . .