/**
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const bodyparser = require('body-parser');
const rp = require('request-promise');

const PORT = process.env.PORT || 9000;
const URI = process.env.GCHAT_URL
  || "https://chat.googleapis.com/v1/spaces/AAAAjKt8bNE/"
  + "messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&"
  + "token=p79tIUVyoFLb1RcdW_3P3KvF3l451_G96YtGQWSXdU8%3D";

const app = express()
    .use(bodyparser.urlencoded({extended: false}))
    .use(bodyparser.json());

app.post('/', async (req, res) => {
  let text = '';
  if (req.headers['x-github-event'] && req.headers['x-github-event'] === 'ping') {
    text = `Github webhook created on repo ${req.body.repository.full_name}`;
  } else if (req.headers['x-github-event'] && req.headers['x-github-event'] === 'push') {
    text = `New push on repo ${req.body.repository.full_name} by *${req.body.pusher.name}*`;
  } else {
    return res.send('Action not performed');
  }
  try {
    gChatResponse = await rp({
      uri: URI,
      method: 'post',
      json: true,
      body: { text },
    });
    return res.json({ gChatResponse });
  } catch (error) {
    return res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in port - ${PORT}`);
});
