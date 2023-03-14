import JsSIP from "jssip";
import { useState, useRef } from 'react';

function Chat() {


    const [chatLog, setChatLog] = useState("");
    const txtMsg = useRef();
    const txtChatLog = useRef();


    
    var userAgent;
    var user = "test";
    var password = "test";
    var ip = "192.168.18.2";
    var port = "8080";
    var friend = "test2";

    function phone_init() {


        var socket = new JsSIP.WebSocketInterface(`ws://${ip}:${port}`);

        var configuration = {
            sockets: [socket],
            uri: `sip:${user}@${ip}`,
            password: password,
            'username': user,
            'display_name': user,
            //extra_headers:["Sec-WebSocket-Protocol: sip"]
        };

        userAgent = new JsSIP.UA(configuration);
        try {
            userAgent = new JsSIP.UA(configuration);
        } catch (e) {
            console.log(e);
        }

        // Transport connection/disconnection callbacks
        userAgent.on('connected', function () {
            console.info('Connected');
            //document.getElementById("start").style.display = "none";
            document.getElementById("chat").style.display = "block";

        }
        );

        userAgent.on('disconnected', function () {
            console.info('disconnect');

        }
        );

        userAgent.on('connecting', function () {
            console.info('connecting');
        }
        );


        // Call/Message reception callbacks
        userAgent.on('call', function (display_name, uri, call) {
            console.log("call");
        }
        );

        userAgent.on('message', function (display_name, uri, text) {
            console.log("message");
            console.log(text);
        }
        );

        // Registration/Deregistration callbacks
        userAgent.on('register', function () {
            console.info('Registered');
            console.log("Registered!");
        }
        );

        userAgent.on('deregister', function () {
            console.info('Deregistered');
            console.log("!");
        }
        );

        userAgent.on('registrationFailure', function () {
            console.info('Registration failure');
            console.log("!");
        }
        );

        try {
            // Start
            userAgent.start();
        } catch (e) {
            console.log(e);
            return;
        }


        //should only send etc when connected.

        console.log("Speedy..");

        // Register callbacks to desired message events
        var eventHandlers = {
            'succeeded': function (e) { console.log("sent"); console.log(e); },
            'failed': function (e) { console.log("no send"); console.log(e); }
        };

        var options = {
            'eventHandlers': eventHandlers
        };



        userAgent.on('newMessage', function (e) {

            console.log(e);
            //console.log(e.request);
            //console.log(e.request.from._display_name);

            var text = e.request.body;

            if (e.originator != 'local') {
                var sender = e.request.from._display_name;
                document.getElementById("chatlog").append(`${sender}:${text}\r\n`);
            }
        });


    }


    function phone_chat() {
        var text = document.getElementById("msg").value.trim();
    
        console.log(text);
    
        userAgent.sendMessage(`sip:${friend}@${ip}`, text);
        document.getElementById("chatlog").append(`Me:${text}\r\n`);
    
      }

    return (
        <div id="chat">

            <textarea id="chatlog" rows="20" cols="50" ref={txtChatLog} value={chatLog} readOnly></textarea>
            <br />
            Message:<input type="text" name="msg" id="msg" ref={txtMsg} />

            <input type="button" name="Login" value="Chat" onClick={phone_chat} />
            <input type="button" name="Start" value="Start" onClick={phone_init} />


        </div>
    );
}

export default Chat;