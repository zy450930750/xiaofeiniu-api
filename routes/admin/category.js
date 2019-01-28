//创建路由器
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/**
 * API: GET/admin/category
 * 含义：客户端获取所有的菜品类别，按标号升序排列
 * 返回值形如：
 * [{cid:1,cname:'..'},{...}]
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        var jsonData = JSON.stringify(result);
        res.send('doData(' + jsonData + ')');
    })
})

/**
* API: DELETE/adimin/category/:cid
* 含义：根据表示菜品编号的路由参数。删除该菜品
* 返回值形如：
* [{code:200,msg:'1 category delete'}]
* [{code:400,msg:'0 category delete'}]
*/
router.delete('/:cid', (req, res) => {
    //注意：删除菜品类别前必须先把属于该类别的菜品的类别编号设置为NULL
    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?', req.params.cid, (err, result) => {
        if (err) throw err;
        //至此指定类别的菜品已经修改完毕
        pool.query('DELETE FROM xfn_category WHERE cid=?', req.params.cid, (err, result) => {
            if (err) throw err;
            //获取DELETE语句载数据库中的行数
            if (result.affectedRows > 0) {
                res.send({ code: 200, msg: '1 category deleted' })
            } else {
                res.send({ code: 400, msg: '0 category deleted' })
            }
        })
    })
})

 /**
 * API: POST/adimin/category/
 * 请求参数：{canme:"xxx"}
 * 含义：根据表示菜品编号的路由参数。删除该菜品
 * 返回值形如：
 * [{code:200,msg:'1 category added', cid: x}]
 */
router.post('/',(req,res)=>{
    var data=req.body;
    pool.query('INSERT INTO xfn_category SET ?',data,(err,restule)=>{
        if(err)throw err;
        res.send({code:200,msg:'1 category added'})
    })
})

 /**
 * API: PUT/adimin/category/
 * 请求参数：{cid:xx, canme:"xxx"}
 * 含义：根据菜品累呗编号修改该类别
 * 返回值形如：
 * [{code:200,msg:'1 category modigied'}]
 * [{code:400,msg:'0 category modigied', not exists}]
 * [{code:200,msg:'0 category modigied, no modification'}]
 */
router.put('/',(req,res)=>{
    var data=req.body;//请求数据{cid:xx,cname:'xx}
    //TODO:此处可以对数据进行验证
    pool.query('UPDATE xfn_category SET ? WHERE cid=?',[data,data.cid],(err,result)=>{
        if(err)throw err;
        if(result.changedRows>0){
            res,send({code:200,msg: '1 category modified'})
        }else if(result.affectedRows==0){
            res.send({code:400,msg:'category not exits'})
        }else if(result.affectedRows==1 && result.changedRows==0)
        {//影响到1行，但修改了0行--新值与旧值完全一样
            res.send({code:401,msg:'no category modified'})
        }
    })
})
