const ajax_module = (function() {
    let response = "";

    function ajaxRequest(sendMode, url, selectorObject, payload, cache) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {

            if (xhr.status === 200) {
                response = xhr.responseText
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };

        /********************************
         Open request by the defined url
        ********************************/
        xhr.open(sendMode[0], (url + selectorObject), 1);


        /************
         Set Headers
        ************/
        if (cache == 1) {
            xhr.setRequestHeader("Cache-Control", "no-cache")
        }
        if (sendMode[1]) {
            xhr.setRequestHeader("Content-Type", sendMode[1])
        }

        /*****************************
         Set payload and send request
        *****************************/
        if (payload) {
            xhr.send(payload);

        } else {
            xhr.send();
        }
    };

    function handleAjax(sendMode, url, selectorObject, callbackFunc, payload, cache) {
        let count = 0;
        response = "";
        ajaxRequest(sendMode, url, selectorObject, payload, cache);
        let AsyncWait = setInterval(function () {
            if (response !== "") {

                if (callbackFunc) {
                    callbackFunc(response)
                }
                clearInterval(AsyncWait);

            } else if (count > 120) {
                clearInterval(AsyncWait);
                console.log(count)
            }
        }, 250);
    };

    function urlEncode(object) {
        let encodedString = "";
        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + object[prop]);
            }
        }
        return encodedString;
    };

    function get (url, selectorObject, callbackFunc, cache) {
        sendmode = ["GET", false];
        selectorObject = "?" + urlEncode(selectorObject);
        handleAjax(sendmode, url, selectorObject, callbackFunc, false, cache);
    };

    function post(url, selectorObject, callbackFunc, payload, cache) {
        sendmode = ["POST", "application/x-www-form-urlencoded"];

        if (selectorObject) {
            selectorObject = "?" + urlEncode(selectorObject);
        } else {
            selectorObject = "";
        }

        payload = urlEncode(payload);
        console.log(payload);

        handleAjax(sendmode, url, selectorObject, callbackFunc, payload, cache);
    };

    function putJson(url, selectorObject, callbackFunc, payload, cache) {
        sendmode = ["PUT", "application/json"];

        if (selectorObject) {
            selectorObject = "?" + urlEncode(selectorObject);
        } else {
            selectorObject = "";
        }

        payload = JSON.stringify(payload);

        handleAjax(sendmode, url, selectorObject, callbackFunc, payload, cache);
    };

    function postFile(url, selectorObject, callbackFunc, payload, cache) {
        sendmode = ["POST", 3];
        selectorObject = "?" + urlEncode(selectorObject);
        handleAjax("POST", url, selectorObject, callbackFunc, payload, cache);
    };


    return {
        // get:           get (url, selectorObject, callbackFunc, cache),
        // post:         post (url, selectorObject, callbackFunc, payload, cache),
        // postJson: postJson (url, selectorObject, callbackFunc, payload, cache),
        // postFile: postFile (url, selectorObject, callbackFunc, payload, cache),

        get: (function (url, selectorObject, callbackFunc, cache) {
            get (url, selectorObject, callbackFunc, cache);
        }),

        post: (function (url, selectorObject, callbackFunc, payload, cache) {
            post (url, selectorObject, callbackFunc, payload, cache);
        }),

        postJson: (function (url, selectorObject, callbackFunc, payload, cache) {
            putJson (url, selectorObject, callbackFunc, payload, cache);
        }),
        postFile: (function (url, selectorObject, callbackFunc, payload, cache) {
            postFile (url, selectorObject, callbackFunc, payload, cache);
        }),
    }
}) ();


let callback = function(response) {
    console.log(response);
};

let object = {json:1}
let object2 = {id:5, name:"fernando"}
// ajax_module.get("respond.php", object, ,1)

// ajax_module.post("respond.php", false, callback, object2, 1);

ajax_module.postJson("respond.php", object, callback, object2, 1);

// console.log( urlEncode(object) )
