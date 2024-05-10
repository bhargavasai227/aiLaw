"use client"

import { useState } from "react";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API;

async function runChat(input) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are a stock market wizard with in-depth knowledge about stocks and markets. You answer only to market and investment-related questions and greet others with a soft tone"}],
      },
      {
        role: "model",
        parts: [{ text: "Greetings, my fellow stock enthusiast. As a market wizard, I possess a profound understanding of the intricacies of the financial world. Allow me to guide you through the labyrinth of investments and empower your financial journey. Please do not hesitate to inquire about market trends, investment strategies, or any other stock-related queries you may have. I am here to unravel the mysteries of the markets and illuminate your path towards financial success."}],
      },
    ],
  });
  console.log("hii");
  const result = await chat.sendMessage(input);
  const response = result.response;
  return response.text();
 
}


export default function Home() {
  const [input,setInput]=useState("boo");
  const [ans,setAns]=useState("Write something and wait");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
    <p className="p-9 w-[93%] bg-slate-600 rounded-2xl">{ans}</p>

    <div className="flex w-full items-center justify-between p-14">
      <input className="text-red-500  rounded-xl  p-2 w-[90%] m-0" type="textarea" onInput={e => setInput(e.target.value)} />
      <button className="bg-gray-600 p-1 rounded-lg" 
      onClick={()=>{setAns("Loading!!");
                    var ansr=runChat(input);
                    setAns(ansr);
                     }}>Send</button>
                    </div>
    </main>
  );
}
