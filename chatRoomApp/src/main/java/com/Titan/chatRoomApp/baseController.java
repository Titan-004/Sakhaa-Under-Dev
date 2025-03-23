package com.Titan.chatRoomApp;

import com.Titan.chatRoomApp.Models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class baseController {

    @MessageMapping("/msg")
    @SendTo("/topic/return-to")
    public Message getMessage(@RequestBody Message message) {
        try{
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return message;
    }

}
