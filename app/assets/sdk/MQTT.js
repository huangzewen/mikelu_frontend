var mqttoptions = function () {
    var host = window.localStorage.sockethost;
    var port = 8884;
    var clientId = window.localStorage.clientid;
    var userName = window.localStorage.loginname;
    var password = window.localStorage.password;
    var data = "Hello World";

    //创建mqtt客户端
    client = new Paho.MQTT.Client(host, port, clientId);

    var options = {
        userName: userName,
        password: password,
        keepAliveInterval: 60,
        useSSL: true,
        onSuccess: onConnect,
        onFailure: onError
    };

// 建立连接
    client.connect(options);

// 监听链接是否正常
    client.onConnectionLost = function (responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    };
// 监听接收数据
    client.onMessageArrived = function (message) {
        console.log("onMessageArrived:" + message.payloadString);
    };

//失败
    function onError() {
        console.log('fail');
    }

}

function onConnect() {
    console.log("onConnect");
    // onSubscribe();
}

// 订阅

// function onSubscribe() {
//     var topic = window.localStorage.endpoint + "/ec34ed2880c311e78d1700163e03b4d6/" + "8739a878824911e7b7ac00163e30fc50" + "/status/json";
//     client.subscribe(topic, {
//         // onSuccess: onPublish,        //订阅成功发布消息
//         // onFailure: onError           //订阅失败提示fail
//     });
// }

//发布
function onPublish(deviceid, payload) {
    var topic = window.localStorage.endpoint + "/ec34ed2880c311e78d1700163e03b4d6/" + deviceid + "/command/json";
    var message = new Paho.MQTT.Message(payload);
    message.destinationName = topic;
    client.send(message);
    console.log(message.payloadString)
}



