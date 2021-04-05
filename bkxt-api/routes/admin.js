var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var pool = require('../config/config')
var CryptoJS = require("crypto-js")

// 加密
function encrypt(key, text) {
  return CryptoJS.AES.encrypt(text, key).toString()
}

// 解密
function decrypt(key, cipherText) {
  let bytes = CryptoJS.AES.decrypt(cipherText, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// 登录接口
// http://127.0.0.1:8888/admin/login
router.post('/login', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('连接失败')
    } else {
      let user = req.body.username
      let pass = req.body.password

      console.log("User:"+user)
      // 对称加密
      let cipherText = encrypt(user, pass)
      let originalText = decrypt(user, cipherText)
      let data = [user, originalText]
      let sql = 'select * from admin where username = ? and password =?'

      conn.query(sql, data, function (error, results) {
        if (error) {
          console.log('查询失败')
        } else if (results.length != 0) {
          const payload = { // 定义 token 的有限载荷
            name: results.username
          }
          const secret = "anpai" // 给定密钥
          const token = jwt.sign(payload, secret, {
            "expiresIn": 1000 // 设置过期时间
          })
          
          let time = new Date()
          let sql1 = 'update admin set last_login_at=? where username=?'
          let data1 = [time, user]
          conn.query(sql1, data1)
          console.log("Token:"+token)
          console.log("Data:"+results)
          res.json({
            token: token,
            data: results
          })
          console.log("登录成功")
        } else {
          res.json({
            msg: '请输入正确信息'
          })
        }
      })
      conn.release()
    }
  })
})

// 管理员列表接口
// http://127.0.0.1:8888/admin/
router.get('/', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('连接失败')
    } else {
      let sql = 'select * from admin'
      conn.query(sql, function (error, results) {
        if (error) {
          console.log('查询失败')
          return
        }
        res.send(results)
      })
      conn.release()
    }
  })
})

// 单条管理员信息接口
// http://127.0.0.1:8888/admin/one
router.post('/one', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('连接失败')
      return
    } else {
      let sql = 'select * from admin where username=?'
      let name = req.body.username
      conn.query(sql, name, function (error, results) {
        if (error) {
          console.log('查询失败')
          return
        } else if (results.length == 0) {
          res.send('没有该用户')
        }
        res.send(results)
      })
      conn.release()
    }
  })
})

// 添加管理员接口
// http://127.0.0.1:8888/admin/insert
router.post('/insert', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('连接失败')
      return
    } else {
      let user = req.body.username
      let pass = req.body.password
      let name = req.body.a_name
      let rol = req.body.role
      let sql = 'insert into admin set ?'
      let data = {
        username: user,
        password: pass,
        a_name: name,
        role: rol,
        last_login_at: new Date(),
        a_created_at: new Date(),
        a_updated_at: new Date()
      }

      conn.query(sql, data, function (error, results) {
        if (error) {
          console.log('创建失败')
          return
        }
        res.send(results)
      })
      conn.release()
    }
  })
})

// 修改管理员接口
// http://127.0.0.1:8888/admin/update
router.put('/update', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('连接失败')
      return
    } else {
      let id = req.body.a_id
      let user = req.body.username
      let pass = req.body.password
      let name = req.body.a_name
      let rol = req.body.role

      let sql = 'update admin set username=?,password=?,a_name=?,role=?,last_login_at=?,a_updated_at=? where a_id=?'
      let data = [user, pass, name, rol, new Date(), new Date(), id]
      conn.query(sql, data, function (error, results) {
        if (error) {
          console.log('修改失败')
          return
        }
        res.send('修改成功')
      })
      conn.release()
    }
  })
})

// 删除管理员接口
// http://127.0.0.1:8888/admin/del
router.delete('/del', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log('连接失败')
      return
    } else {
      let sql = 'delete from admin where a_id=?'
      let id = req.body.a_id
      conn.query(sql, id, function (error, results) {
        if (error) {
          console.log('删除失败')
          return
        }
        res.send('删除成功')
      })
      conn.release()
    }
  })
})

module.exports = router;