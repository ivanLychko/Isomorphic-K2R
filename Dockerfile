FROM node:14-slim
RUN apt-get update && apt-get install -y procps
RUN cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime
WORKDIR /app
RUN npm i pm2 webpack webpack-cli -g
COPY package*.json .
RUN npm i
COPY . .
RUN webpack
CMD ["pm2-runtime", "start", "./index.js", "--name", "Isomorphic-K2R"]
EXPOSE 4002
