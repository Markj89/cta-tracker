FROM node:18-alpine

LABEL maintainer="Marcus Jackson <marcusj98@gmail.com>"

WORKDIR /app

# Copy build files
COPY package.json .

#buildkit
RUN yarn install --development --ignore-engines

# Copy code files
COPY . .

RUN yarn run build

#RUN yarn run build

EXPOSE 8080

CMD ["yarn", "dev"]
