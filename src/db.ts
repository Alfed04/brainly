import mongoose, { model,Schema,Types }  from "mongoose";

mongoose.connect("mongodb+srv://admin:41OKilru4Ldl8KJh@alfed-cluster.ao1es.mongodb.net/brainly")

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
const ContentSchema = new Schema({
    link: {type: String,required: true},
    type: {type: String, required: true},
    title: {type: String, required: true},
    tag: [{type: Types.ObjectId , ref: "Tag"}],
    userId: {type: Types.ObjectId, ref: "User",required: true}
})
const TagSchema = new Schema({
    title: {type: String}
})
const LinkSchema = new Schema({
    hash: {type: String},
    userId: {type: Types.ObjectId , ref: "User",required: true, unique: true}
})

export const UserModel = model("User", UserSchema)
export const ContentModel = model("Content", ContentSchema)
export const TagModel = model("Tag",TagSchema)
export const LinkModel = model("Link",LinkSchema)

