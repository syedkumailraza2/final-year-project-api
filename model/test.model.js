import mongoose from "mongoose";

const testSchema =  new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date
    },
    
    time: {
        type: String, // Store time separately as a string (HH:MM format)
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"]
    },
    duration:{
        type:String
    },
    question1:[{
        title:{
            type:String
        },
        options:[],
        answer:{
            type:String
        }
    }],
    question2:[{
        title:{
            type:String
        },
        options:[],
        answer:{
            type:String
        }
    }],
    question3:[{
        title:{
            type:String
        },
        options:[],
        answer:{
            type:String
        }
    }],
    question4:[{
        title:{
            type:String
        },
        options:[],
        answer:{
            type:String
        }
    }],
    question5:[{
        title:{
            type:String
        },
        options:[],
        answer:{
            type:String
        }
    }],
},{timestamps:true})

 const Test = mongoose.model("Test",testSchema)
 export default Test