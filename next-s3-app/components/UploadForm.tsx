"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setData(data);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <input
      className="border border-gray-300 rounded py-2 px-4"
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
        }}
      />
      <button className="bg-blue-700 py-2 px-6 mt-2 rounded" onClick={handleUpload}>Upload</button>

      {data?.url && (
        <div className="mt-4 w-full max-w-md">
          <p>Uploaded image:</p>
          <img src={data.url} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}

    </div>
  );
}
