package com.Titan.chatRoomApp.Models;

public class Message {
    private String sender;
    private String message;


    public Message(String message , String sender){
        this.message= message;
        this.sender=sender;
    }
    public Message(){}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
