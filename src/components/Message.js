import React, { useState } from "react";
import like_icon from "../assets/like.png"

const Message = (props) => {

    const [likes, setLikes] = useState(0)

    return (
        <div className="message">
            <div className="user_icon" style={{"backgroundColor":props.user.color}}>
                {props.user.name[0]}
            </div>
            <div className="header">
                <strong className="name">{props.user.name}</strong>
                <span className="time">{props.time}</span>
            </div>
            <div className="body">
                <div className="text">
                    {props.text}
                </div>
                <div className="like">
                    <img className="like_button" src={like_icon} alt="Like"
                    onClick={()=>{setLikes(likes+1)}}></img>
                    <span className="like_count">{likes}</span>
                </div>
            </div>
        </div>
    )
}

export default Message;