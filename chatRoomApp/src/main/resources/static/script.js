let stompClient = null

function showMessage(message) {
    console.log("Received message:", message);  // Debugging
    $("#message-table").append(
        `<tr><td><b>${message.sender}</b>: ${message.message}</td></tr>`
    );
    let chatBox = $("#chat-box");
        chatBox.scrollTop(chatBox[0].scrollHeight);
}

function sendMessage() {
    let messageInput = $("#message-input");
    let messageText = messageInput.val().trim();

    if (messageText !== "") {
        let jsonObj = {
            sender: localStorage.getItem("name"),
            message: messageText
        };
        stompClient.send("/app/msg", {}, JSON.stringify(jsonObj));

        messageInput.val(""); // Clears the input box after sending
    } else {
        messageInput.addClass("shake-input"); // Add shake effect
        setTimeout(() => messageInput.removeClass("shake-input"), 500); // Remove effect after 500ms
    }
}


function connect() {
    let socket = new SockJS('/serv-1');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        $("#card").addClass("d-none");
        $("#chatroom").removeClass("d-none");


        stompClient.subscribe('/topic/return-to', function (response) {
            showMessage(JSON.parse(response.body));
        });
    });
}
$(document).ready(function() {

    $("#nickname-submit").click(()=> {
        let name=$("#nickname-input").val()
        localStorage.setItem("name",name)
        connect();
    })

    $("#send-btn").click(function() {
        sendMessage();
    })

     $("#message-input").keypress(function(event) {
            if (event.which === 13) {  // 13 is the Enter key code
                event.preventDefault(); // Prevent default new line in input
                sendMessage();
            }
        });
     $("#leave-btn").click(function() {
        localStorage.removeItem("name");
        if(stompClient!=null){
            stompClient.disconnect();
              $("#card").removeClass("d-none");
                    $("#chatroom").addClass("d-none");
                    $("#nickname-input").val("");
        }
     });



});
