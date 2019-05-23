FROM node:10.14.2-alpine

ARG env=dev

ENV PORT=6006

RUN rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify

ADD package*.json /var/build/

WORKDIR /var/build

RUN cd /var/build

RUN npm install

COPY . .

RUN npm run build

EXPOSE 6006

CMD [ "node", "fragment.js" ]
