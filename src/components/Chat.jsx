import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import createSocketConnection from "../utils/socket";
import { useParams } from "react-router-dom";
import BASE_URL from "../constants/constants";
import axios from "axios";

const Chat = () => {
  const user = useSelector((store) => store.user);
  
  const [message, setMessage] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const { targetId } = useParams();
  const userId = user?._id;

  const fetchChat = async()=>{
   
    const chat = await axios.get(BASE_URL+"chat/"+targetId,{withCredentials:true})
    //console.log(chat)
    const msgArr = chat?.data?.messages.map(item=>{
      return{
        userName:item?.senderId?.userName,
        text:item?.text
      }
    })
    //console.log(msgArr);
    setMessage(msgArr)
    
  }

  useEffect(()=>{
     fetchChat()
  },[message])

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { name: user?.userName, targetId, userId });

    socket.on("receivedMessage", ({ name, text }) => {
      //console.log("listening to received msg socket");
      console.log(name + " " + text);
      setMessage((msg) => [...msg, { name: name, text: text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      name: user?.userName,
      targetId,
      userId,
      text: newMessage,
    });

    setNewMessage("");
  };
  console.log(message);

  return (
    <div className="flex flex-col mt-10 w-[50vw] mx-auto border border-green-500 rounded-xl h-[80vh]">
      <h1 className="border-b border-green-500 p-3 text-xl text-green-500">Chatify!!!</h1>
      <div className="flex-1 overflow-y-scroll border-b border-green-500 p-5">
        {message.map((msg, ind) => {
          return (
            <div
              key={ind}
              className={
                "chat " +
                (user?.userName === msg?.userName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header text-green-400">
                {`${msg?.userName}`}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg?.text}</div>
              <div className="chat-footer opacity-50 text-green-500 mb-2">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-green-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-green-500 bg-gray-900 outline-0 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-success">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
