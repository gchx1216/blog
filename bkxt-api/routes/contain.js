var express = require('express');
var router = express.Router();

var pool = require('../config/config')

// http://localhost:8888/ctn/first
router.get("/first",function(req,res,next){
    pool.getConnection((err,conn)=>{
        if(err){
            console.log("连接失败")
            console.log(err)
        } else {
            let sql = "select * from article where cid = 1"
            conn.query(sql,function(error,results){
                if(error){
                    console.log("查询失败")
                } else {
                    res.send(results)
                }
            })
        }
    })
})

// http://localhost:8888/ctn/sec
router.get("/sec",function(req,res,next){
    pool.getConnection((err,conn)=>{
        if(err){
            console.log("连接失败")
            console.log(err)
        } else {
            let sql = "select * from article where cid = 2"
            conn.query(sql,function(error,results){
                if(error){
                    console.log("查询失败")
                } else {
                    res.send(results)
                }
            })
        }
    })
})

// http://localhost:8888/ctn/thi
router.get("/thi",function(req,res,next){
    pool.getConnection((err,conn)=>{
        if(err){
            console.log("连接失败")
            console.log(err)
        } else {
            let sql = "select * from article where cid = 3"
            conn.query(sql,function(error,results){
                if(error){
                    console.log("查询失败")
                } else {
                    res.send(results)
                }
            })
        }
    })
})

// http://localhost:8888/ctn/fou
router.get("/fou",function(req,res,next){
    pool.getConnection((err,conn)=>{
        if(err){
            console.log("连接失败")
            console.log(err)
        } else {
            let sql = "select * from article where cid = 4"
            conn.query(sql,function(error,results){
                if(error){
                    console.log("查询失败")
                } else {
                    res.send(results)
                }
            })
        }
    })
})
module.exports = router;