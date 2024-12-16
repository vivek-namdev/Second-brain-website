import { ContentModel, LinkModel, UserModel } from './db';
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
import { random } from './utils';

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username: username,
        password: password
    });

    res.json({
        message: "User signed up"
    });
});

app.post("api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
           message: "Incorrect credentials"
        })
    }
})

app.post("api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]

    })

    res.json({
        message: "Content added"
    })
})

app.get("api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.body.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        content
    })
})

app.delete("api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "deleted"
    })
})

app.post("api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if(share) {
       await LinkModel.create({
        //@ts-ignore
           userId: req.userId,
           hash: random(10)
        })
    } else {
       await LinkModel.deleteOne({
        //@ts-ignore
        userId: req.userId
       })
    }

    res.json({
        message: "Updated sharable link"
    })

})

app.get("api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if(!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    //userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        userId: link.userId
    })

    if(!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})

app.listen(3000);