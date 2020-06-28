FROM node:10-alpine

RUN mkdir -p /vention && chown -R node:node /vention
WORKDIR /vention

COPY ./src/api/package*.json ./src/api/
RUN chown -R node:node /vention/src/api

USER node

RUN npm install --prefix src/api

COPY --chown=node:node . .

WORKDIR /vention/src/api

EXPOSE 9090

CMD [ "npm", "run", "start:dev" ]