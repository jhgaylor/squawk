FROM node:0.12.5
MAINTAINER Jake Gaylor <jhgaylor@gmail.com>

RUN npm install -g forever

ADD ./dist /app
ADD ./package.json /app/package.json
WORKDIR /app
RUN npm install
ENV PORT 3000
ENV NODE_ENV production
RUN touch .foreverignore

CMD ["forever", "index.js"]
