import express from "express";
import cors from "cors";
import type {Webhook, Payload} from "./types";


const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
}))

const db: Webhook[] = [];


app.get("/", (req, res)=>{
    res.send("Hello, from lms");
})

app.post("/api/register-webhook", (req, res)=>{
    const {url, token , event} = req.body;

    if(!url || !token || !event){
        return res.status(400).json({message: "Missing required fields"});
    }
    
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newWebhook: Webhook = {
        id,
        url,
        token,
        event
    }
    db.push(newWebhook);
    console.log("db", db);
    res.status(201).json({message: "Webhook registered successfully", webhook: newWebhook});
})

app.post("/api/purchase", (req, res)=>{
    const {name, email, course} = req.body;

    if(!name || !email || !course){
        return res.status(400).json({message: "Missing required fields"});
    }
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const payload: Payload = {
        id,
        name,
        email,
        course
    }

    const webhooks = db.filter(webhook => webhook.event === "purchase");

    sendWebhook(webhooks, payload);

    console.log("payload", payload);
    res.status(201).json({message: "Purchase recorded successfully", payload});
})

async function sendWebhook(webhooks: Webhook[], payload: Payload){
    for(const webhook of webhooks){
        try{
            const response = await fetch(webhook.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${webhook.token}`
                },
                body: JSON.stringify(payload)
            });
            if(!response.ok){
                console.error(`Failed to send webhook to ${webhook.url}: ${response.statusText}`);
            }else{
                console.log(`Webhook sent to ${webhook.url} successfully`);
            }
        }catch(error){
            console.error(`Error sending webhook to ${webhook.url}:`, error);
        }
    }
}

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})