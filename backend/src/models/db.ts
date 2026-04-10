import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }
})

const EdgesSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    }
}, {
    _id: false
})

const PositionSchema = new Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    }
}, {
    _id: false
})

const NodeDataSchema = new Schema({
    kind: {
        type: String,
        enum: ["ACTION", "TRIGGER"]
    },
    metadata: Schema.Types.Mixed
}, {
    _id: false
})


const WorkflowNodeSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    position: PositionSchema,
    crendentials: Schema.Types.ObjectId,
    nodeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Nodes'
    },
    data: NodeDataSchema
}, {
    _id: false
})

const WorkflowSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    nodes: [WorkflowNodeSchema],
    edges: [EdgesSchema]
})


const CrendentialsTypeSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    required: {
        type: String,
        required: true
    }
})


const NodesSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    type:{
        type:String,
        enum: ["ACTION", "TRIGGER"],
        required: true
    },
    crendentialsType: [CrendentialsTypeSchema]
})

const ExecutionSchema = new Schema({
    workflowId: {
        type : mongoose.Types.ObjectId,
        required: true,
        ref: "Workflows"
    },
    status: {
        type: String,
        enum:["PENDING", "SUCCESS", "PENDING"]
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date
    }
})

export const UserModel = mongoose.model("Users", UserSchema)
export const WorkflowModel = mongoose.model("Workflows", WorkflowSchema)
export const NodeModel = mongoose.model("Nodes", NodesSchema)
export const ExecutionModel = mongoose.model("Executions", ExecutionSchema)