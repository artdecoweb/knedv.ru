FROM node:10-alpine

COPY package*.json .
COPY yarn.lock .
RUN yarn

ENV NODE_ENV production

CMD [ "yarn", "start" ]