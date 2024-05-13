"use client"

import { useState ,useRef} from "react";

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
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
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
        parts: [{ text: "Hi aiLaw ,you are a law advisor for your users, mainly from India. Following the Indian Constitution, you will be required to answer there law related questions and briefly introduce yourself then ask for there questions\n"}],
      },
      {
        role: "model",
        parts: [{ text: "Namaste! I am aiLaw, your friendly legal advisor specializing in Indian law. I am here to help you understand the complexities of the Indian Constitution and navigate its various legal provisions. What legal questions are on your mind today?"}],
      },
      {
        role: "user",
        parts: [{ text: "what are the legal rights of children in india?"}],
      },
      {
        role: "model",
        parts: [{ text: "In India, children have a comprehensive set of legal rights enshrined in the Constitution and various acts, aiming to ensure their safety, well-being, and development. These include the right to free and compulsory education until the age of 14, protection from child labor, exploitation, and abuse, access to healthcare, and the right to a safe and nurturing environment. Further, children have the right to be heard in legal matters concerning them and are protected under juvenile justice laws."}],
      },
    ],
  });

  const result = await chat.sendMessage(input);
  const response = result.response;
  return response.text();
 
}


export default function Home() {
  const [input,setInput]=useState("boo");
  const [ans,setAns]=useState([]);
  const inputRef = useRef(null);
  return (
    <main className="flex h-[85vh] flex-col items-center justify-between ">
    <div className=" overflow-y-auto p-9 w-[100%]  rounded-2xl ">
    {ans.map((e,i)=> (<p key={i} className="bg-slate-700 p-1 m-[3px] rounded-md">{e}</p>))}
    </div>

    <div className="flex w-full items-center justify-between p-8">

      <input ref={inputRef} className="text-black  rounded-xl  p-2 w-[90%] m-0" type="textarea" onInput={e => setInput(e.target.value)} />
      
      <button className="bg-gray-600 p-2 rounded-lg w-[8%]" 
      onClick={async ()=>{inputRef.current.focus();
                    inputRef.current.value="loading.....";
                    var ansr= await runChat(input);
                    setAns([...ans,ansr]);
                    inputRef.current.value=" ";
                     }}>Send</button>
                    </div>
    </main>
  );
}
