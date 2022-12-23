import React, { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react"
import Message from "./components/Message";
import send_icon from "./assets/send.png";
import emoji_icon from "./assets/emoji.png";
import mention_icon from "./assets/mention.png";
import './App.css';

function App() {

  const user_list = [
    {name:"Alan", color:"red"},
    {name:"Bob", color:"green"},
    {name:"Carol", color:"orange"},
    {name:"Dean", color:"blue"},
    {name:"Elin", color:"purple"}
  ]
  const messageEl = useRef(null);

  const [messages,setMessages] = useState([])
  const [showPicker, setShowPicker] = useState(false)
  const [showMention, setShowMention] = useState(false)
  const [text, setText] = useState("")
  
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  const send = () => {
    if(!text)
    {
      return
    }
    const message = {
      user: user_list[Math.floor(Math.random() * 5)],
      time: (new Date()).getHours()+":"+(new Date()).getMinutes(),
      text: text
    }
    setMessages([...messages,message])
    setText("")
  }

  const Mention = <div className="mention">
    {user_list.map(u=>(<div className="mention_name" onClick={()=>{
      setText(text+"@"+u.name)
      setShowMention(false)
    }}>
      {u.name}
    </div>))}
  </div>

  return (
    <div className="App">
      <div className="message_list" ref={messageEl}>
        {messages.map((m,i)=><Message user={m.user} time={m.time} text={m.text} key={i}/>)}
      </div>
      <div className="input_area">
        <img className="emoji_button" src={emoji_icon} alt="emoji"
        onClick={()=>{setShowPicker(!showPicker)}}></img>
        {showPicker && <Picker onEmojiClick={(emojiObject)=>{
          setText(text+emojiObject.emoji)
          console.log(emojiObject)
        }}/>}
        <img src={mention_icon} className="mention_button" alt="mention"
        onClick={()=>{setShowMention(!showMention)}}></img>
        {showMention && Mention}
        <input id="textbox" placeholder="Type message" value={text}
        onKeyDown={e=>{const key = e.key;if(key==="Enter"){send()}}}
        onChange={e=>{setText(e.target.value)}}></input>
        <img className="send_button" src={send_icon} onClick={()=>{send()}} alt="Send"></img>
      </div>
    </div>
  );
}

export default App;
