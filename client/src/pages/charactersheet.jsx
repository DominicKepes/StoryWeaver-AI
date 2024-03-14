import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
//import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'; 

const API_KEY = "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";

function CharacterSheet() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello! I'm StoryWeaver, a conversational AI. I can help you with creating character sheets for your D&D game. can you give me your name, character name, class, alignment, & level. ",
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


<<<<<<<<< Temporary merge branch 1
  const API_KEY = data.getOpenAIApiKey; // Get the API key from the fetched data
=========
      if(messageObject.sender === "ChatGPT") {
        
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });


    const systemMessage = {
      role: "system",
      content: "Speak like you are a master D&D player that creates character sheets for your friends."
    }
    
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }
    
    await fetch("http://localhost:3001/api/generateCharacterSheet", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    
      body: JSON.stringify(apiRequestBody)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Sending request to OpenAI API:', apiRequestBody);
        return response.json();
      })
      .then((data) => {
        console.log('OpenAI API response:', data);
        if (data.choices && data.choices[0] && data.choices[0].message) {
          console.log(data.choices[0].message.content);
          setMessages(
            [...chatMessages, {
              message: data.choices[0].message.content,
              sender: "ChatGPT"
            }]
          );
        } else {
          console.error('Unexpected API response', data);
          setMessages(
            [...chatMessages, {
              message: "Sorry, I couldn't process your request. Please try again.",
              sender: "ChatGPT"
            }]
          );
        }
        setTyping(false);
      })
      .catch((error) => {
        console.error('Fetch request failed:', error);
        setMessages(
          [...chatMessages, {
            message: "Sorry, I couldn't process your request. Please try again later.",
            sender: "ChatGPT"
          }]
        );
        setTyping(false);
      });
    }
>>>>>>>>> Temporary merge branch 2

  return (
    <div className="App">
      <div style={{ position: "relative", width: "700px", height: "800px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing..." /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default CharacterSheet;



