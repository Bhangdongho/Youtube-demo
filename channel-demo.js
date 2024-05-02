const express = require('express');
const app = express();
app.listen(8000);
app.use(express.json());

let db = new Map();
var id = 1;

app
  .route('/channels')
  .get((req, res) => {
    res.send('전체 조회');
  }) // 채널 전체 조회
  .post((req, res) => {
    res.send('개별 생성');
  }); // 채널 개별 생성

app
  .route('/channels/:id')
  .get((req, res) => {
    res.send('개별 조회');
  }) // 채널 개별 조회
  .put((req, res) => {
    res.send('개별 수정');
  }) // 채널 개별 수정
  .delete((req, res) => {
    res.send('개별 삭제');
  }); // 채널 개별 삭제
