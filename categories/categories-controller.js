const express = require('express');
const router = express.Router();

router.get("/categories",(req,res)=>{
    res.send("rota de categories")
})
router.get("/admin/categories/new",(req,res)=>{
    res.send("rota para criar categories")
})

module.exports = router;