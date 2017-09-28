FROM node:7.9-alpine

RUN apk --update add git openssh-client

RUN mkdir -p /home/app
ENV HOME /home/app
WORKDIR $HOME

COPY package.json yarn.lock webpack.config.js $HOME/
RUN yarn install

ADD . $HOME

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "run", "server" ]
