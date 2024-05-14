const express = require('express')
const router = express.Router()
const conn = require('../mariadb')
const { body, validationResult } = require('express-validator')

router.use(express.json())

let db = new Map()
var id = 1

router
  .route('/')
  .get((req, res) => {
    var { userId } = req.body

    let sql = `SELECT * FROM channels WHERE user_id = ?`
    var channels = []
    if (userId) {
      conn.query(sql, userId, function (err, results) {
        if (results.length) {
          channels = results
        } else {
          notFoundChannel(res)
        }
      })
    } else {
      res.status(400).end()
    }
  }) // 채널 전체 조회
  .post(
    // 유효성 검사
    [
      body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
      body('name').notEmpty().isString().withMessage('문자 입력 필요')
    ],
    (req, res) => {
      const err = validationResult(req)

      if (!err.isEmpty()) {
        return res.status(400).json(err.array())
      }

      const { name, userId } = req.body

      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
      let values = [name, userId]
      conn.query(sql, values, function (err, results) {
        if (err) {
          console.log(err)
          return res.status(400).end()
        }

        res.status(201).json(results)
      })
    }
  ) // 채널 개별 생성

router
  .route('/:id')
  .get((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    let sql = `SELECT * FROM channels WHERE id = ?`
    conn.query(sql, id, function (err, results) {
      if (results.length) res.status(200).json(results)
      else notFoundChannel(res)
    })
  }) // 채널 개별 조회
  .put((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    var channel = db.get(id)
    var oldTitle = channel.channelTitle
    if (channel) {
      var newTitle = req.body.channelTitle

      channel.channelTitle = newTitle
      db.set(id, channel)

      res.json({
        message: `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}`
      })
    } else {
      notFoundChannel()
    }
  }) // 채널 개별 수정
  .delete((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    var channel = db.get(id)
    if (channel) {
      db.delete(id)

      res.status(200).json({
        message: `${channel.channelTitle}이 정상적으로 삭제되었습니다.`
      })
    } else {
      notFoundChannel()
    }
  }) // 채널 개별 삭제

function notFoundChannel(res) {
  res.status(404).json({
    message: '채널 정보를 찾을 수 없습니다.'
  })
}

module.exports = router

// 채널 전체 조회
// .get((req, res) => {
//   var { userId } = req.body
//   var channels = []

//   if (db.size && userId) {
//     db.forEach(function (value, key) {
//       if (value.userId === userId) channels.push(value)
//     })

//     if (channels.length) {
//       res.status(200).json(channels)
//     } else {
//       notFoundChannel()
//     }
//   } else {
//     notFoundChannel()
//   }
// }
