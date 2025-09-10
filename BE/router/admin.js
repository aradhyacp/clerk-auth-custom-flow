import express from "express"
const router = express.Router()

router.get("/test",(req,res)=>{
    res.json({
        message : "working admin"
    })
})

router.get("/jwttest",(req,res)=>{
    res.json({
        message : "working jwt as expected"
    })
});

export default router