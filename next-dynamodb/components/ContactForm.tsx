"use client"

import { useState } from "react";


const ContactForm = () => {


      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

           setLoading(true);
    setMessage("");
    
            const formData = new FormData(e.currentTarget);

             const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

try {
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      setMessage("Message sent successfully!");
      e.currentTarget.reset();
    } catch (error) {
      setMessage("Failed to send message.");
    } finally {
      setLoading(false);
    }
    
    };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <input
             className="border border-gray-300 rounded-md p-2 "
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
          <input
          className="border border-gray-300 rounded-md p-2 "
          name="email"
          type="email"
          placeholder="Your email"
          required
        />

        <textarea
        className="border border-gray-300 rounded-md p-2 "
          name="message"
          placeholder="Your message"
          required
        />
         <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors duration-300" disabled={loading}>
          {loading ? "Sending" : "Send Message"}
        </button>
        </form>
        <div className="mt-4">{message && <p>{message}</p>}</div>
    </div>
  )
}

export default ContactForm