import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const makeRequest = async () => {
    setMessages((prev) => [
      ...prev,
      {
        name: "User",
        text: message,
      },
    ]);
    setLoading(true);
    try {
      let data = JSON.stringify({
        customer_message: message,
      });
      let config = {
        method: "post",
        url: "https://auto-caller-back.vercel.app/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const res = await axios(config);
      console.log(res);
      setMessages((prev) => [
        ...prev,
        {
          name: "Bot",
          text: res.data.response,
        },
      ]);
      setMessage("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        disabled={loading}
      />
      <button onClick={makeRequest} disabled={loading}>
        Send
      </button>
      <div className="messages">
        {messages.map((item, idx) => {
          return (
            <div
              className={item.name === "Bot" ? "message bot" : "message user"}
              key={idx + item.text}
            >
              {item.name} : {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
