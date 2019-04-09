FROM node:10.15-alpine

ENV GCHAT_URL "https://chat.googleapis.com/v1/spaces/AAAAjKt8bNE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=p79tIUVyoFLb1RcdW_3P3KvF3l451_G96YtGQWSXdU8%3D"
ENV PORT 9000

WORKDIR /usr/src/bot
COPY package*.json ./
RUN npm install
COPY . .

ENTRYPOINT ["node"]
CMD ["index.js"]