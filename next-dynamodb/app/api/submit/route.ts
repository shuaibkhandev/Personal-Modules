import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import {v4 as uuidv4} from "uuid"


const client = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey:process.env.AWS_ACCESS_SECRET_KEY!,
  }
});

export async function POST(request: NextRequest) {
  try {
    // Get data sent from frontend
    const body = await request.json();

    const { name, email, message } = body;

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Create contact object
    const contact = {
      id: uuidv4(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    // Create DynamoDB command
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Item: contact,
    });

    // Save data to DynamoDB
    await client.send(command);
console.log(contact)
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("DynamoDB Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save message",
      },
      { status: 500 }
    );
  }
}