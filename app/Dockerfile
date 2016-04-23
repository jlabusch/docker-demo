FROM node:4.3.0

RUN mkdir -p /opt/app && cd /opt/app && npm install pg

WORKDIR /opt/app

COPY . /opt/app

CMD ["node", "./index.js"]
