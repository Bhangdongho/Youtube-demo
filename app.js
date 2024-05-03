const express = require('express');
const app = express();

app.listen(8000);

const userRouter = require('./routes/user-demo'); // user-demo 소환?
// chanenel-demo 소환?

app.use('/', userRouter);
