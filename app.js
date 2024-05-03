const express = require('express');
const app = express();

app.listen(8000);

const userRouter = require('./routes/users'); // users 소환
const channelRouter = require('./routes/channels'); // channels 소환

app.use('/', userRouter); // users.js는 URL이 통일되어 있지 않아 그냥 '/'만 쓰는 것이다.
app.use('/channels', channelRouter); // URL 통일되어 있는 channels는 이렇게 밖으로 빼서 쓸 수 있다.
