# pick image with git and bash
# ARG BASE=mcr.microsoft.com/vscode/devcontainers/javascript-node:0-16-bullseye
ARG BASE=node:16-bullseye

# no ENV vars required buildtime

#---------------------

FROM ${BASE} AS dependencies
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV development

COPY package*.json ./

RUN npm install

# COPY . .

# don't copy source, mount it via volume

# volumes folders must be created and chowned before docker-compose creates them as root
# create them during docker build
RUN mkdir -p build
RUN chown node:node . node_modules build

USER node

# debug
# RUN ls -la node_modules/.prisma/client

EXPOSE 3001
ENV PORT 3001

CMD [ "npm", "start" ]