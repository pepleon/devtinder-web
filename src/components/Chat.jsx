import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnections } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {




const {targetUserId} = useParams();
const user = useSelector((store)=>store.user);
const userId = user?._id;
const name = user?.firstName;
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");
const [targetName, setTargetName] = useState(" ");



const fetchChatMessages = async () => {
  try{

    const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{
      withCredentials: true,
    });
 
    console.log(chat.data.messages);
      const chatMessages = chat?.data?.messages?.map(
        (mesg) =>{

          const {senderId, text} = mesg;
          setTargetName(senderId.firstName);
          return (
           {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text: text,
            photoURL: senderId?.photoURL
           }
          )
        }
      )


      setMessages(chatMessages);
  }
  catch(err){

  }
}

useEffect(()=>{
  fetchChatMessages();
})


useEffect(()=>{
 
if(!userId){
return;
}    
const socket = createSocketConnections();
socket.emit("joinChat",{userId, targetUserId, name})
socket.on("messageReceived", ({firstName, text}) =>{

    console.log(firstName+ " " + text);

 setMessages((messages)=> [...messages, {firstName, text}])   
    })
return () => {
    socket.disconnect();
}

},[userId, targetUserId]);



const sendMessageFunction = () => {

    const socket = createSocketConnections();
    socket.emit("sendMessage", { firstName: name, userId, targetUserId, text: newMessage

    })
setNewMessage("");
  
        
}





  return (
    <div className='w-full p-5   md:w-3/4 mx-auto border border-gray-600 m-8 h-[70vh] flex flex-col'>
          <h1 className='p-5 border-b border-gray-600'>{"Chat with "+targetName}</h1>
          <div className='flex-1 overflow-scroll p-5' >
            {
           messages.map((message, index) => {
            return (
            <div key={index}>
                
                <div className={"chat " +(user.firstName === message.firstName ? "chat-end" : "chat-start")}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={user.firstName === message.firstName ? user?.photoURL: message.photoURL} />
    </div>
  </div>
  <div className="chat-header">
    {message.firstName+" "+message.lastName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{message.text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
                </div>
            )

           })

            }
          </div>
          <div className='p-5 border-t border-gray-600 flex gap-2 items-center'>

            <input className='flex-1 border-gray-600 text-white rounded p-2'
            value={newMessage}
            onChange={
                (e)=> setNewMessage( e.target.value)
            }
            ></input> 
            <button className='btn btn-secondary' 
            onClick={sendMessageFunction}
            >Send</button>
          </div>

    </div>
  )
}

export default Chat;