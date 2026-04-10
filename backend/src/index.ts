import express from "express"
import mongoose from "mongoose";
import { CreateWorkflowSchema, SigninSchema, SignupSchema, UpdateWorkflowSchema } from "./common/types/index.js";
import "dotenv/config"
import { ExecutionModel, NodeModel, UserModel, WorkflowModel } from "./models/db.js";
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware.js";

const app = express();
app.use(express.json())
const JWT_SECRET = process.env.JWT_SECRET!


app.post("/signup", async (req, res) => {
    const { success, data } = SignupSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "incorrect inputs"
        })
    }
    try {
        const user = await UserModel.create({
            username: data?.username,
            password: data?.password
        })
        res.json({
            id: user._id
        })
    } catch (err) {
        res.status(411).json({
            message: "username already exists"
        })
    }
})

app.post("/signin", async (req, res) => {
    const { success, data } = SigninSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "incorrect inputs"
        })
    }
    try {
        const user = await UserModel.findOne({
            username: data?.username,
            password: data?.password
        })
        if (user) {
            const token = jwt.sign({
                id: user._id
            }, JWT_SECRET)

            res.json({
                id: user._id, token
            })

        } else {
            res.status(411).json({
                message: "invalid crenditals"
            })

        }
    } catch (err) {
        res.status(411).json({
            message: "username already exists"
        })
    }

})

app.post("/workflow", authMiddleware, async(req, res)=>{
    const userId = req.userId;
    const {success, data} = CreateWorkflowSchema.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message:"incorrect inputs"
        })
        return
    }
    try {
        const workflow = await WorkflowModel.create({
            userId, 
            nodes: data.nodes,
            edges: data.edges,
        })
        console.log(workflow.nodes)

        res.json({
            id: workflow._id
        })
    } catch (error) {
        res.status(411).json({
            message: "failed to create a workflow"
        })
    }
})


app.put("/workflow/:workflowId", authMiddleware, async(req, res)=>{
    const {success, data} = UpdateWorkflowSchema.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message:"incorrect inputs"
        })
    }
    try {
        const workflow  = await WorkflowModel.findByIdAndUpdate(
            req.params.workflowid, data,
            {new: true}
        )
        if(!workflow){
            res.status(404).json({
                message:"workflow not found"
            })
        }
        res.json({
            id: workflow?._id
        })
    } catch (error) {
                res.status(411).json({
            message: "failed to update the workflow"
        })

    }
})

app.get("/workflows", authMiddleware, async(req, res)=>{
    const workflows = await WorkflowModel.find({userId: req.userId});
    res.json(workflows)
})

app.get("/workflow/workflowId", authMiddleware, async(req, res)=>{
    const workflow = await WorkflowModel.findById(req.params.workflowId);
    if(!workflow || workflow.userId.toString() !== req.userId){
        res.status(404).json({
            message:"workflow not found"
        })
        return
    }
    res.json(workflow) 
})


app.get("workflow/executions/:workflowId", authMiddleware, async(req, res)=>{
    const executions = await ExecutionModel.find({workflowId: req.params.workflowId});
    res.json(executions);
})

app.get("/nodes", async(req, res)=>{
    const nodes = await NodeModel.find();
    res.json(nodes)
})


mongoose
    .connect(process.env.Mongo_URL as string).then(()=>console.log("connected to backend"))

app.listen(3000, () => {
    console.log("server stated at 3000")
})