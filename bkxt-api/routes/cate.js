var express = require('express');
var router = express.Router();

var pool = require('../config/config')

/* GET home page. */
// http://127.0.0.1:8888/
router.get('/', function(req, res, next) {
  res.render('index');
});



//分类列表接口
// http://127.0.0.1:8888/classification
router.get('/classification',function(req,res,next){
  pool.getConnection(function(err,conn){
    if(err){
      console.log('连接失败')
      return
    } else{
      console.log('连接成功')
      let sql = 'select * from cate'
      
      conn.query(sql,function(error,results){
        if(error){
          console.log('分类失败')
          return
        }
        res.send(results)
      })
      conn.release()
    }
  })
})

//单条分类信息接口
//http://127.0.0.1:8888/one
router.get('/one',function(req,res,next){
  pool.getConnection(function(err,conn){
    if(err){
      console.log('连接失败')
      return
    } else{
      console.log('连接成功')
      let sql = 'select * from cate where title = ?'
      let name = req.query.title
      
      conn.query(sql,name,function(error,results){
        if(error){
          console.log('分类失败')
          return
        } else {
          res.send(results)
        }
      })
      conn.release()
    }
  })
})

//添加分类接口
//http://127.0.0.1:8888/insert
router.post('/insert',function(req,res,next){
  pool.getConnection(function(err,conn){
    if(err){
      console.log('连接失败')
      return
    } else{
      console.log('连接成功')
      let c_name = req.body.title

      var data = {title:c_name,c_created_at:new Date(),c_updated_at:new Date()}
      console.log(data)

      let sql = "insert into cate set ?"

      conn.query(sql,data,function(error,results){
        if(error) {
          console.log('插入失败')
          return
        } 
        if(results) {
          res.send(results)
        }
      })
      conn.release()
    }
  })
})

//修改分类接口
// http://localhost:8888/update
router.put('/update',function(req,res){
  pool.getConnection(function(err,conn){
      if(err){
        console.log('连接失败')
        return
      }else{
        let nid = req.body.id
        let nname = req.body.title
        let ncreated_at = req.body.c_created_at
          
        var data = [nname,new Date(ncreated_at),new Date(),nid]
        
        let sql='update cate set title=?,c_created_at=?,c_updated_at=? where id=?'
        conn.query(sql,data,function(error,results){
          if(error){
            console.log('更新失败')
            return
          }
          if(results){
            res.send('修改成功')
          }
        })
        conn.release()
      }
  })  
})

//删除分类接口
// http://localhost:8888/del
router.delete('/del',function(req,res,next){
  pool.getConnection(function(err,conn){
    if(err){
      console.log('连接失败')
      return
    } else {
      console.log('连接成功')
      let sql = 'delete from cate where id=?'
      let id = req.body.id
      conn.query(sql,id,function(error,results){
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
