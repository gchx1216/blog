
var express = require('express');
var router = express.Router();

var pool = require('../config/config')

//文章列表接口
//http://127.0.0.1:8888/article
router.get('/',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else{
            let sql = 'select * from article'

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

// 单条文章信息接口
// http://127.0.0.1:8888/article/one
router.get('/one',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else {
            let sql = 'select * from article where aname = ?'
            let name = req.query.aname

            conn.query(sql,name,function(error,results){
                if(error){
                    console.log('查询失败')
                    console.log(error)
                }
                if(results.length == 0){
                    res.send('没有这篇文章')
                  }
                res.send(results)
            })
            conn.release()
        }

    })
})

// 添加文章接口
// http://127.0.0.1:8888/article/insert
router.post('/insert',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else {
            let id = req.body.aid
            let name = req.body.aname
            let no = req.body.cid
            let sql = 'insert into article set ?'
            let data = {aid:id,aname:name,cid:no,acreated_at:new Date(),aupdated_at:new Date()}

            conn.query(sql,data,function(error,results){
                if(error){
                    console.log('添加失败')
                    return
                }
                res.send(results)
            })
            conn.release()
        }
    })
})

// 修改文章接口
// http://127.0.0.1:8888/article/update
router.put('/update',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else{
            let id = req.body.aid
            let name = req.body.aname
            let no = req.body.cid
            let created_at = req.body.acreated_at
            let sql = 'update article set aname=?,cid=?,acreated_at=?,aupdated_at=? where aid=?'
            let data = [name,no,new Date(created_at),new Date(),id]
            console.log(data)
            conn.query(sql,data,function(error,results){
                if(error){
                    console.log('修改失败')
                }
                res.send('修改成功')
            })
            conn.release()
        }
    })
})

// 删除文章接口
// http://127.0.0.1:8888/article/del
router.delete('/del',function(req,res,next){
    pool.getConnection(function(err,conn){
        if(err){
            console.log('连接失败')
        } else {
            let sql = 'delete from article where aid = ?'
            let name = req.body.aid

            conn.query(sql,name,function(error,results){
                if(error){
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