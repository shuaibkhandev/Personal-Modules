import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  console.log("File buffer:", buffer);

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `uploads/${Date.now()}-${file.name}`,
    Body: buffer, 
    ContentType: file.type,
  };
  try {
    const result = await s3.upload(params).promise();
    return Response.json({ message: "File uploaded successfully", url: result.Location });
  } catch (error) {
    console.error("Error uploading file:", error);
    return Response.json({ error: "Error uploading file" }, { status: 500 });
  }
}
