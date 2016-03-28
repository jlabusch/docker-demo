FROM node:4.3.0

RUN useradd -m -s /bin/bash demo && mkdir -p /opt/app

WORKDIR /opt/app

COPY . /opt/app

RUN cd /opt/app && npm install --save pg && chown -R demo:demo /opt/app

USER demo

CMD ["node", "./index.js"]
