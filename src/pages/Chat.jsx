
import { useState, useRef, useEffect } from 'react';
import '../css/chat.css';
import $ from 'jquery';

import UserAgent from '../lib/UserAgent';

function Dropdown() {

    const [users, setUsers] = useState([]);

    // get all the list of users once the component is loaded
    useEffect(() => {

        console.log("Started");
        $.ajax({
            url: "http://localhost:8081/user",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data, textStatus, xhr) {
                //console.log(data);
                //console.log(textStatus);
                if (data != null) {

                    setUsers(data);

                } else {
                    console.log("Issue in retrieving...");
                }


            },
            error: function (xhr, textStatus, err) {
                console.log(err);

            }
        });
    }, [])

    return (
        <div className="selectWrapper">
            <select className="selectBox" id="friend">
                <option key={'Select Friend'} value={'None'}>Select Friend</option>
                {users.map((user) => (
                    <option key={user['username']} value={user['username']}>{user['username']}</option>
                ))}
            </select>
        </div>
    );
}
function Chat() {

    var incomingCallAudio = new window.Audio('/sounds/msn-sound.mp3');

    var friend;
    var Message;
    var getMessageText, message_side, updateMessage;
    var userJson = JSON.parse(localStorage.getItem("userData"))[0];
    var user = userJson.username//"test";
    var ip = UserAgent.ip;

    var userAgent = UserAgent.getUserAgent();

    $(function () {

        Message = function (arg) {
            this.text = arg.text;
            this.message_side = arg.message_side;
            this.sender = arg.sender;
            this.draw = function (_this) {
                return function () {
                    var $message;
                    $message = $($('.message_template').clone().html());
                    //console.log($message);
                    $message.addClass(_this.message_side).find('.text').html(_this.text);
                    $message.find('#avatar').html(_this.sender);
                    $('.messages').append($message);
                    return setTimeout(function () {
                        return $message.addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };

        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        updateMessage = function (text, message_side = 'right', sender = 'Me') {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            //message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side,
                sender: sender
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            phone_chat();
            return updateMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                phone_chat();
                return updateMessage(getMessageText());
            }
        });

    });



    try {
        // Start
        if (!userAgent.isConnected()) {

            userAgent.start();
        }
    } catch (e) {
        console.log(e);
        return;
    }


    //should only send etc when connected.
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
        var sender = e.request.from._display_name;

        //$('#avatar').html(sender);
        console.log(sender);
        if (e.originator != 'local') {
            incomingCallAudio.play();

            var chatMsg = e.request.body;
            //document.getElementById("chatlog").append(`${sender}:${text}\r\n`);
            updateMessage(chatMsg, 'left', sender);
        }
    });


    //   }


    function phone_chat() {
        var text = document.getElementById("msg").value.trim();
        var friend = $('#friend').val();
        //console.log(text);
        //console.log(friend);
        userAgent.sendMessage(`${UserAgent.protocol}:${friend}@${ip}`, text);
        //document.getElementById("chatlog").append(`Me:${text}\r\n`);

    }

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossOrigin="anonymous"></script>

            <div className="chat_window">
                <div className="top_menu">
                    <div className="buttons"><Dropdown /></div>

                    <div className="title">Chat</div>

                </div>
                <ul className="messages"></ul>


                <div className="bottom_wrapper clearfix">
                    <div className="message_input_wrapper">

                        <input type="text" id="msg" className="message_input" placeholder="Type your message here..." />
                    </div>

                    <div className="send_message">
                        <div className="icon"></div>
                        <div className="text">Send</div>
                    </div>

                </div>

            </div>
            <div className="message_template">
                <li className="message">
                    <div id="avatar" className="avatar">Me</div>
                    <div className="text_wrapper">
                        <div className="text"></div>
                    </div>
                </li>
            </div>
        </div>
    );
}

export default Chat;