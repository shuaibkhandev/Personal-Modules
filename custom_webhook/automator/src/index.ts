import express from "express";
import cors from "cors";
import type {Payload} from "./types";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello, from automator");
})


app.post("/webhook", (req, res)=>{
    const {id, name, email, course} = req.body as Payload;

    if(req.headers["authorization"] !== "Bearer mysecrettoken"){
        return res.status(401).json({message:"Unauthorized"});
    }

    console.log(`Sending email to ${name} (${email}) for course ${course}`);

    return res.status(200).json({message: "Email sent successfully"});
})


app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})