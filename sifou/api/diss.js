const express = require("express");
const pool = require("../pool.js");
var router = express.Router();

router.post("/v1/publicDiss", (req, res) => {
    var obj = req.body;
    // console.log(11111111111);
    if (!obj.diss) {
        res.send({ code: 401, msg: "diss required" });
    }
    pool.query("insert into sifou_diss set ?", [obj], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 1) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

module.exports = router;