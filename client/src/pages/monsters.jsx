import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'; 

const API_KEY = "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";

function Monsters() {
  const { loading, error, data } = useQuery(GET_OPENAI_API_KEY); // Use the useQuery hook to fetch the API key

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Can you describe the monster you would like to create?",
      sender: "ChatGPT",
      direction: "incoming",
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages, retryDelay = 1000) {
    
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";

      if(messageObject.sender === "ChatGPT") {
        
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const systemMessage = {
      role: "system",
      content: "Speak like you are a master D&D player that creates monsters for your friends."
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }
    
   await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages(
          [...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }]
        );
        setTyping(false);
      })
    }

  return (
    <div className="container monsters-page">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>Monsters</h2>
          <p>This is the Monsters page. You can view and manage your monsters here.</p>
        </div>
      </div>
    </div>
  );
}

export default Monsters;
