FROM node:0.12.5
MAINTAINER Jake Gaylor <jhgaylor@gmail.com>

RUN npm install -g forever

ADD ./dist /app
ADD ./package.json /app/package.json
WORKDIR /app
RUN npm install
ENV PORT 3000
ENV NODE_ENV production
# This needs to be elsewhere!
ENV MONGO_URL mongodb://squawk:squawk@c1151.candidate.20.mongolayer.com:11151,candidate.17.mongolayer.com:11046/squawk?replicaSet=set-5598d0490f86947c68000d88

RUN touch .foreverignore

CMD ["forever", "index.js"]
