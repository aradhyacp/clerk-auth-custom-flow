import express from "express"
import { getAuth } from "@clerk/express";
const router = express.Router()

router.get("/test",(req,res)=>{
    res.json({
        message : "working user"
    })
});

router.get("/jwttest",(req,res)=>{
    res.json({
        message : "working jwt as expected"
    })
});

export default router