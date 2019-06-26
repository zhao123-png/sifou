const express = require("express");
const pool = require("../pool.js");
var router = express.Router();
//登录
router.get("/v1/login/:sphone-:spwd", (req, res) => {
    var obj = req.params;
    pool.query("select * from sifou_reg where sphone=? and spwd=?", [obj.sphone, obj.spwd], (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//查询全部
router.get("/v1/list", (req, res) => {
    pool.query("select * from sifou_public", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//注释
router.get("/v1/listByName/:pid", (req, res) => {
    var $pid = req.params.pid;
    if (!$pid) {
        res.send({ node: 401, msg: "sname required" });
    }
    //console.log($pid);
    var sql = "select * from sifou_public where pid=?";
    pool.query(sql, [$pid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//��ѯ����
router.get("/v1/searchDiss/:pid", (req, res) => {
    var $pid = req.params.pid;
    pool.query("select * from sifou_diss where pid=?", [$pid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//��������
router.post("/v1/public", (req, res) => {
    var obj = req.body;
    obj.greate = Number(obj.greate);
    obj.reader = Number(obj.reader);
    var date = new Date();
    obj.dateTi = date.getTime();
    pool.query("insert into sifou_public set ? ", [obj], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 1) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});


//�û�ע��
router.post("/v1/reg", (req, res) => {
    var obj = req.body;
    pool.query("insert into sifou_reg set ?", [obj], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 1) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//�޸�����
router.put("/v1/updpwd", (req, res) => {
    var obj = req.body;
    pool.query("update sifou_reg set spwd=? where sphone=?", [obj.spwd, obj.sphone], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows == 1) {
            res.send("1");
        } else {
            res.send("0");
        }
    });

});

//��ѯ�����Ƿ���ͬ
router.get("/v1/checkpwd/:sphone", (req, res) => {
    var $sphone = req.params.sphone;
    pool.query("select * from sifou_reg where sphone=?", [$sphone], (err, result) => {
        if (err) throw err;
        //console.log(result);
        if (result.length == 1) {
            res.send(result[0].spwd);
        } else {
            res.send("0");
        }

    });
});

//点赞数
router.put("/v1/addGreat", (req, res) => {
    var great = req.body.greate;
    var pid = req.body.id;
    great++;
    var sql = "update sifou_public set greate=? where pid=? ";
    pool.query(sql, [great, pid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 1) {
            res.send("1");
        }
    });
});

module.exports = router;