FROM alpine:latest

WORKDIR /home/rain/direct-link-downloader-bot

RUN apk add nodejs yarn

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

CMD ["yarn", "start"]