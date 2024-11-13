"use client";

import { useState } from "react";
import axios from "axios";
import { validateEmail } from "@/utils/validateEmail";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("/api/newsletter/subscribe", { email });
      if (response.status === 201) {
        setMessage("Successfully subscribed!");
        setEmail("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setMessage("Email already exists.");
      } else {
        console.error("Error subscribing:", error);
        setMessage("Subscription failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-3xl shadow-lg inline-block max-w-md mx-auto newsletter-form">
      <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
}