FROM node:18 as base
FROM mongo

LABEL MAINTAINER Marcus Jackson <marcusj98@gmail.com>

# Envs
ENV MONGO_INITDB_ROOT_USERNAME root
ENV MONGO_INITDB_ROOT_PASSWORD root
ENV MONGO_INITDB_DATABASE ctaTrackerDB

# Working directory
WORKDIR /home/app

FROM base as deps

# Folder to copy from
COPY server/initialData/stations.json  ./server/initialData/stations.json
COPY server/package.json  ./server/package.json
COPY server/init/importscript.sh ./server/init/importscript.sh
COPY server/init/init-mongo.js  ./server/init/init-mongo.js
COPY package.json .

# Run
RUN yarn run start

# PORT
EXPOSE 27017

CMD [ "node", "index.mjs" ]