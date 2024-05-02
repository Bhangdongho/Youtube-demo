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
    if (req.body.channelTitle) {
      db.set(id++, req.body);

      res.status(201).json({
        message: `${db.get(id - 1).channelTitle}채널을 응원합니다.`,
      });
    } else {
      res.status(400).json({
        message: '요청 값을 제대로 보내주세요.',
      });
    }
  }); // 채널 개별 생성 = db에 저장

app
  .route('/channels/:id')
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    var channel = db.get(id);
    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message: '채널 정보를 찾을 수 없습니다.',
      });
    }
  }) // 채널 개별 조회
  .put((req, res) => {
    res.send('개별 수정');
  }) // 채널 개별 수정
  .delete((req, res) => {
    res.send('개별 삭제');
  }); // 채널 개별 삭제
