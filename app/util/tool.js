import axios from 'axios'
import Config from './config'

export default {
    client: null,
    reqUrl: Config.reqestUrl,
    fogUrl: Config.fogRequsetUrl,
    fogCollectionUrl: Config.fogCollectionUrl,
    open_id: Config.open_id,
    queryName: Config.wechat_alias,
    device_id:Config.device_id,
    /**
     * 
     * promise请求封装，返回promise对象
     * @returns 
     */
    getPromise(reqObj) {
        if (typeof reqObj !== 'object') {
            return
        }
        if (reqObj.url === '') {
            throw 'please check your request param ===> no url'
        }
        return new Promise((resolve, reject) => {
            axios({
                method: reqObj.type || 'get',
                url: reqObj.url,
                data: reqObj.param || {}
            }).then(data => {
                if (data) {
                    resolve(data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 多请求，封装
     * 
     * @param {any} reqObj 
     * @returns 
     */
    multiRequest(reqObj) {
        let promise_arr = []
        if (typeof reqObj !== 'object') {
            return
        }

        reqObj.forEach((ele) => {
            promise_arr.push(
                this.singleRequest(ele.type, ele.url, ele.params)
            )
        });

        return new Promise((resolve, reject) => {
            Promise.all(promise_arr).then(res => {
                if (res) {
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 超时函数
     * 
     * @param {any} ms 
     */
    delayRequestFn(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    msg: '请求超时，请确认你的网络正常',
                    data: {}
                })
            }, ms)
        })
    },

    /**
     * 单请求
     * @param {any} type 
     * @param {any} url 
     * @param {any} param 
     * @param {any} ms          //设置的请求超时时间
     * @returns 
     */
    singleRequest(type, url, param, ms) {
        return new Promise((resolve, reject) => {
            Promise.race([this.delayRequestFn(ms || 10000), this.getPromise({ type: type, url: url, param: param })]).then(res => {
                if (res) {
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 
     * 获取url参数对象
     * @param {any} str 
     */
    getParamFromUri(str) {
        //判断url是否为string
        if (typeof str !== 'string') {
            return
        }

        var paramObj = {};
        //解码+分离域名和参数
        var paramArr = decodeURI(str).split('?');


        //undefined 返回
        if (paramArr[1] === undefined) {
            return
        }

        //分离参数+遍历
        paramArr[1].split('&').map(val => {
            var KeyVal = val.split('=');
            var ObjKey = KeyVal[0];
            var ObjVal = KeyVal[1] || true; //当不存在值是，默认为true
            if (typeof ObjVal === 'string' && Number.isNaN(Number(ObjVal)) === false) {
                ObjVal = Number(ObjVal);
            }
            if (typeof paramObj[ObjKey] === 'undefined') {
                paramObj[ObjKey] = ObjVal;
            } else {
                //相同键的值保存为数组,判断此时此键的值是否为数组
                var newArr = Array.isArray(paramObj[ObjKey]) ? paramObj[ObjKey] : [paramObj[ObjKey]];
                newArr.push(ObjVal);
                paramObj[ObjKey] = newArr;
            }
        });
    
        return paramObj;
    },

    /**
     * MQTT 授权
     * 
     * @param {any} obj 
     * @param {any} successcallback 
     * @param {any} failcallback 
     */
    MQTTAuthorize(obj, successcallback, failcallback) {
        if (typeof obj !== 'object') {
            return
        }
        axios
            .get('https://api.fogcloud.io/v3/wechat/getusermqttinfo/', {
                username: '',
                password: ''
            })
            .then(res => {
                if (res) {
                    if (successcallback && typeof successcallback === 'function') {
                        successcallback(res)
                    }
                }
            }).catch(err => {
                if (failcallback && typeof failcallback === 'function') {
                    failcallback(err)
                }
            })
    },

    /**
     * 创建MQTT websocket服务
     * 
     */
    createWebsocketClient() {
        let host = window.localStorage.sockethost,
            port = 8884,
            cliendId = window.localStorage.clientid,
            userName = window.localStorage.useraname,
            password = window.localStorage.password

        this.client = new SVGPathSegLinetoHorizontalAbs.MQTT.Client(host, port, cliendId)

        const options = {
            userName: userName,
            password: password,
            keepAliveInterval: 60,
            useSSL: true,
            onSuccess: onConnect,
            onFailure: onError
        }

        this.client.connect(options)



        const onConnect = function() {
            console.log('connected')
        }

        const onError = function() {
            console.log('error');
        }

        this.client.onConnectionLost = function(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        }

        this.client.onMessageArrived = function(message) {
            console.log("onMessageArrived:" + message.payloadString);
        };
    },

    /**
     * 
     * 推送至设备
     * 
     */
    onPublishFromMQTT2Device(deviceid, payload) {
        var topic = window.localStorage.endpoint + "/ec34ed2880c311e78d1700163e03b4d6/" + deviceid + "/command/json";
        var message = new Paho.MQTT.Message(payload);
        message.destinationName = topic;
        this.client.send(message);
        console.log(message.payloadString)
    },

    /**
     * 
     * 单曲播放接口封装
     * 
     */
    SinglePlayToDevice(trackId,deviceId,callback){
        console.log(trackId);
        this.singleRequest('post',this.reqUrl,{
            method: 'get',
            para:{
                "method": "taobao.ailab.aicloud.open.audio.play",
                "schema": localStorage.getItem('fog_product_id'),
                "user_id": localStorage.getItem('fog_device_id'),
                "utd_id": localStorage.getItem('fog_device_id'),
                "track_id": trackId.toString(),
                "device_id": localStorage.getItem('device_id')
            }
        }).then(res => {
            if(res){
                if(callback && typeof callback === 'function'){
                    callback(res)
                }
            }
        })
    }
}