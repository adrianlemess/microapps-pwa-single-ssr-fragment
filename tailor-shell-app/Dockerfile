FROM node:10.14.2-alpine

ARG env

ENV NODE_ENV $env
ENV PORT=3000

ADD package.json package-lock.json /tmp/build/

RUN cd /tmp/build

WORKDIR /tmp/build

RUN npm install

ADD . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]