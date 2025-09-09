import express from "express"
const router = express.Router()

router.get("/test",(rew,res)=>{
    res.json({
        message : "working user"
    })
})
export default router