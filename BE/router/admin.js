import express from "express"
const router = express.Router()

router.get("/test",(rew,res)=>{
    res.json({
        message : "working admin"
    })
})
export default router