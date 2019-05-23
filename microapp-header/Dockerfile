FROM node:10.15.0-alpine
ARG env=dev
ARG PORT
ARG ENTRY_POINT_ID
ARG PUBLIC_PATH

ENV ENTRY_POINT_ID=$ENTRY_POINT_ID
ENV PUBLIC_PATH=$PUBLIC_PATH

ADD package.json package-lock.json /tmp/build/

RUN cd /tmp/build

WORKDIR /tmp/build

RUN npm install

COPY . .

CMD [ "npm", "run", "compile:umd" ]