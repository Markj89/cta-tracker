FROM node:18-alpine

LABEL maintainer="Marcus Jackson <marcusj98@gmail.com>"

WORKDIR /app

# Copy build files
COPY package.json .

# Install dependencies
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
