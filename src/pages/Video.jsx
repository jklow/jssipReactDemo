import { useState, useRef, useEffect } from 'react';
import '../css/call.css';
import $ from 'jquery';
import Dropdown from "./Dropdown";
import UserAgent from '../lib/UserAgent';

function Video() {

    var session;
    var userJson = JSON.parse(localStorage.getItem("userData"))[0];
    var user = userJson.username//"test";
    var ip = UserAgent.ip;

    var incomingCallAudio = new window.Audio('/sounds/ring.mp3');
    incomingCallAudio.loop = true;
    incomingCallAudio.crossOrigin = "anonymous";
    var remoteAudio = new window.Audio();
    remoteAudio.autoplay = true;
    remoteAudio.crossOrigin = "anonymous";

    var callOptions = {
        mediaConstraints: { audio: true, video: true }
    };

    $(function () {
        var userAgent = UserAgent.getUserAgent();

        userAgent.on('newRTCSession', function (ev) {
            var newSession = ev.session;

            console.log("Call");
            if (session) { // hangup any existing call
                session.terminate();
            }
            session = newSession;
            var completeSession = function () {
                session = null;
                updateUI();
            };
            session.on('ended', completeSession);
            session.on('failed', completeSession);
            session.on('accepted', updateUI);
            session.on('confirmed', function () {
                console.log('Call confirmed');
                var localStream = session.connection.getLocalStreams()[0];
                var dtmfSender = session.connection.createDTMFSender(localStream.getAudioTracks()[0])
                session.sendDTMF = function (tone) {
                    dtmfSender.insertDTMF(tone);
                };
                updateUI();
            });

            session.on('peerconnection', (e) => {
                console.log('peerconnection', e);
                let logError = '';
                const peerconnection = e.peerconnection;
                add_stream();

            });

            if (session.direction === 'incoming') {
                incomingCallAudio.play();
            } else {
                console.log('con', session.connection)
                add_stream();

            }
            updateUI();
        });

        userAgent.start();
        //updateUI();

        $('#connectCall').click(function () {
            var friend = $('#friend').val();
            var dest=`${UserAgent.protocol}:${friend}@${UserAgent.ip}`;
            userAgent.call(dest, callOptions);
            updateUI();
        });


        $('#answer').click(function () {
            session.answer(callOptions);
        });

        var hangup = function () {
            session.terminate();
        };

        $('#hangUp').click(hangup);
        $('#reject').click(hangup);

        $('#mute').click(function () {
            console.log('MUTE CLICKED');
            if (session.isMuted().audio) {
                session.unmute({ audio: true });
            } else {
                session.mute({ audio: true });
            }
            updateUI();
        });


        function updateUI() {

            console.log("UI Update");
            //if (configuration.uri && configuration.password) {

            $('#wrapper').show();

            if (session) {
                if (session.isInProgress()) {
                    if (session.direction === 'incoming') {

                        var caller = session.remote_identity.uri;
                
                        //console.log(caller._user);
                        $('#callInfoText').html(`In Call with ${caller}`);
                        $('#incomingCallNumber').html(caller._user);

                        $('#incomingCall').show();
                        $('#callControl').hide()
                        $('#incomingCall').show();
                    } else {
                        $('#callInfoText').html('Ringing...');
                        //$('#callInfoNumber').html(session.remote_identity.uri.user);
                        $('#callStatus').show();
                    }

                } else if (session.isEstablished()) {
                    $('#callStatus').show();
                    $('#incomingCall').hide();
                    var caller = session.remote_identity.uri;
                    $('#callInfoText').html(`In Call with ${caller}`);
                    incomingCallAudio.pause();
                }
                $('#callControl').hide();
            } else {
                $('#incomingCall').hide();
                $('#callControl').show();
                $('#callStatus').hide();
                $('#inCallButtons').hide();
                incomingCallAudio.pause();
            }
            //microphone mute icon
            if (session && session.isMuted().audio) {
                //console.log("Mute");
                //mute call

                $('#muteIcon').addClass('fa-microphone-slash');
                $('#muteIcon').removeClass('fa-microphone');



            } else {
                //console.log("Unmute");
                //unmute call
                $('#muteIcon').removeClass('fa-microphone-slash');
                $('#muteIcon').addClass('fa-microphone');
            }


        }

        function add_stream() {
            //var selfView = document.getElementById('selfView');
            var remoteView = document.getElementById('remoteView');

            session.connection.addEventListener('addstream', function (e) {
                remoteAudio.srcObject = (e.stream);
                remoteView.srcObject = (e.stream);
                console.log("Linked Sources!!!!");
                //selfView.srcObject = (session.connection.getLocalStreams()[0]);
            })
        }
    });


    return (

        <div id="wrapper">
            <div id="video">
                <video id="remoteView" autoPlay></video>
            </div>
            <div id="incomingCall" style={{ display: "none" }}>
                <div className="callInfo">
                    <h3>Incoming Call</h3>
                    <p id="incomingCallNumber">Unknown</p>
                </div>
                <div id="answer"> <i className="fa fa-phone"></i></div>
                <div id="reject"> <i className="fa fa-phone"></i></div>
            </div>
            <div id="callStatus" style={{ display: "none" }}>
                <div className="callInfo">
                    <h3 id="callInfoText">info text goes here</h3>
                </div>
                <div id="mute">
                    <i id="muteIcon" className="fa fa-microphone"></i>
                </div>
                <div id="hangUp"> <i className="fa fa-phone"></i>
                </div>
            </div>


            <div id="callControl">
                <div id="to">
                    <Dropdown />
                </div>

                <div id="connectCall"> <i className="fa fa-phone"></i>

                </div>
            </div>
        </div>

    );
}

export default Video;