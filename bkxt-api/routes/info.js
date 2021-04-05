var express = require('express');
var router = express.Router();

var pool = require('../config/config')

// 查看博客信息接口
// http://localhost:8888/info
router.get('/',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else{
            let sql = 'select * from info'
            conn.query(sql,function(error,results){
                if(error){
                    console.log('查询失败')
                } 
                res.send(results)
            })
            conn.release()
        }
        
    })
})

// 修改博客信息接口
// http://localhost:8888/info/update
router.get('/update',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else{
            let id = req.body.i_id
            let tit = req.body.title
            let sub = req.body.subtitle
            let ab = req.body.about
            let created_at = req.body.icreated_at

            let sql = 'update info set title=?,subtitle=?,about=?,icreated_at=?,iupdated_at=? where i_id=?'
            let data = [tit,sub,ab,created_at,new Date(),id]

            conn.query(sql,data,function(error,results){
                if(error){
                    console.log('修改失败')
                }
                if(results){
                    res.send('修改成功')
                }
            })
            conn.release()
        }

    })
})
module.exports = router;