//Have to use shim to export io, then accept it as param here

require(["io", "jquery", "jquery.ui", "jquery.ui.chatbox"], function(io) {
// define(["jquery", "jquery.alpha", "jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.

    // $(function() {
    //     // $('body').alpha().beta();
    //     console.log("Loaded!");
    // });


    // $(document).ready(function(){
    //
    // });
    console.log("Started");
    
    // $(document).ready(function(){
    console.log("2 doc ready");
    var box = null;
    $("input[type='button']").click(function(event, ui) {
        if(box) {
            box.chatbox("option", "boxManager").toggleBox();
        }
        else {
            box = $("#chat_div").chatbox({
                id:"You",
                user:{key : "value"},
                title : "Randy is online!",
                messageSent : function(id, user, msg) {
                    // $("#log").append(id + " said: " + msg + "<br/>");
                    $("#chat_div").chatbox("option", "boxManager").addMsg(id, msg);

                    const jmsg = {data: msg};
                    console.log("Sending event: " + JSON.stringify(jmsg));
                    socket.emit('to_host', jmsg);

                }});
        }
    });



    // Use a "/test" namespace.
    // An application can open a connection on multiple namespaces, and
    // Socket.IO will multiplex all those connections on a single
    // physical channel. If you don't care about multiple channels, you
    // can set the namespace to an empty string.
    namespace = '/chat';
    // Connect to the Socket.IO server.
    // The connection URL has the following format:
    //     http[s]://<domain>:<port>[/<namespace>]
    // var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);
    var socket = io.connect('http://' + document.domain + ':' + '5000' + namespace);
    // Event handler for new connections.
    // The callback function is invoked when a connection with the
    // server is established.
    socket.on('connect', function() {
        console.log("Connected to ws chat");
        socket.emit('my_event', {data: 'I\'m connected!'});
    });

    // Event handler for server sent data.
    // The callback function is invoked whenever the server emits data
    // to the client. The data is then displayed in the "Received"
    // section of the page.
    socket.on('to_visitor', function(msg) {
        console.log("received msg: " + msg);
        $("#chat_div").chatbox("option", "boxManager").addMsg("Randy", msg.data);
        $('#log').append('<br>' + $('<div/>').text('Received: ' + msg.data).html());
    });

    // Handlers for the different forms in the page.
    // These accept data from the user and send it to the server in a
    // variety of ways
    $('form#emit').submit(function(event) {
        const msg = {data: $('#emit_data').val()};
        console.log("Sending event: " + JSON.stringify(msg));
        socket.emit('to_host', msg);
        return false;
    });
// });

});

