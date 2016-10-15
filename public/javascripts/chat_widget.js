requirejs.config({
    "baseUrl": "assets/javascripts/lib"
    ,"paths": {
        "chat_widget": "../chat_widget"
        // ,"jquery": "//code.jquery.com/jquery-1.4.2.min"
        ,"jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min"

        ,"io": "//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.5/socket.io"
        ,"jquery.ui": "//ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min"
    }
    ,"shim": {
        "jquery.ui.chatbox": ["jquery"]
        ,"jquery.beta": ["jquery"]
        ,"io":{
            exports: "io"
        }
        // ,"jquery": ["io"]
    }
});

// Load the main app module to start the app
requirejs(["chat_widget/main"]);