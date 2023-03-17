import JsSIP from "jssip";

var UserAgent = {

    ip: "192.168.18.2",
    port: "8080",
    protocol:"sip",

    getUserAgent: function () {

        JsSIP.debug.enable('JsSIP:*');
        var ip = UserAgent.ip;
        var port = UserAgent.port;
        var protocol=UserAgent.protocol;
        var userAgent;

        var userJson = JSON.parse(localStorage.getItem("userData"))[0];
        var JWT = localStorage.getItem("token");

        var user = userJson.username//"test";
        var password = JWT.split(".")[2];//get signature


        //    function initUI() {

        var socket = new JsSIP.WebSocketInterface(`ws://${ip}:${port}`);

        var configuration = {
            sockets: [socket],
            uri: `${protocol}:${user}@${ip}`,
            password: password,
            'username': user,
            'display_name': user,
            'register':true
            //extra_headers:["Sec-WebSocket-Protocol: sip"]
        };

        try {
            userAgent = new JsSIP.UA(configuration);
        } catch (e) {
            console.log(e);
            return null;
        }


        //define SIP stuff
        // Transport connection/disconnection callbacks
        userAgent.on('connected', function () {
            console.info('Connected');
            console.log(`Logged in as ${user}`);

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


        return userAgent;
    }
}
export default UserAgent;