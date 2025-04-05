import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.username;
  try {
    await UserModel.create({
      username,
      password,
    });

    res.status(200).json({
      message: "User Signed Up",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});
app.post("/api/v1/signin",async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    console.log(existingUser)
    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "User do not exists"
        })
    }
});
app.post("/api/v1/content",userMiddleware,async (req, res) => {
    const link = req.body.link
    // const type = req.body.type
    const title = req.body.title
    //@ts-ignore
    const userId = req.userId
    await ContentModel.create({
        link,
        // type,
        title,
        userId
    })
    res.json({
        message: "Content Added"
    })
});
app.get("/api/v1/content", userMiddleware ,async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const content = await ContentModel.find({
        userId
    })
    res.json({
        content
    })
});
app.delete("/api/v1/content",userMiddleware,async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const contentId = req.body.contentId
    await ContentModel.deleteOne({
        contentId,
        userId
    })
    res.json({
        message: "Content deleted successfully"
    })
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share
    if(share){
        const existingUser = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        })
        if(existingUser){
            res.json({
                hash:existingUser.hash
            })
            return
        }
        const hash = random(10)
        await LinkModel.create({
            hash: hash,
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            hash: hash
        })
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
             userId: req.userId
        })
        res.json({
            message: "Removed Link!"
        })
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash: hash
    })
    if(!link){
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return 
    }
    const content = await ContentModel.findOne({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId
    })
    if(!user){
        res.json({
            message: "User do not exist, error should ideally not happen"
        })
        return 
    }
    res.json({
        username: user.username,
        content:  content 
    })
});

app.listen(3000, () => {
  console.log("App is listening to the requests coming at port number 3000");
});


