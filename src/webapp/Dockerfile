FROM node:10-alpine as build

RUN mkdir -p /vention && chown -R node:node /vention
WORKDIR /vention

COPY ./src/webapp/package*.json ./src/webapp/
RUN chown -R node:node /vention/src/webapp

USER node

RUN npm install --prefix src/webapp

COPY --chown=node:node . .

WORKDIR /vention/src/webapp

RUN npm run build

FROM nginx:1.12-alpine

COPY --from=build /vention/src/webapp/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /vention/src/webapp/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]