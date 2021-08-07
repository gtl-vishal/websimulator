const net = require("net"); // import net
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
}); // this will be important later


let telemetryData = {
    "webClient": "",
    "SequenceNumber": 2,
    "bedID": "clientnewDev-192.168.43.222:63788",
    "datetime": "Fri May 7 09:12:34 2021 GMT",
    "devicetype": "smartmedic",
    "deviceversion": "1.0",
    "episodeID": "1d11263f-4b64-4df8-bcfe-436fc74c631e",
    "exitAlarm": "",
    "hospitalcode": "",
    "isValidSensorDataPresent": true,
    "messagetype": "Telemetary",
    "messageversion": "1.1",
    "patient_position": -1,
    "soft_tare": -0.025065362453460693,
    "telemetaryversion": "1.0",
    "unixdatetime": 1620378754,
    "weight_on_demand": false,
    "wp1": {
        "bedAngle": 0.24752049148082733,
        "wc1": 0.17506274580955505,
        "wc2": 1.7614749670028687,
        "wc3": 2.518371105194092,
        "wc4": 0.6596812009811401
    },
    "wp2": {
        "bedAngle": 0,
        "wc1": 0,
        "wc2": 0,
        "wc3": 0,
        "wc4": 0
    },
    "wp3": {
        "bedAngle": 0,
        "wc1": 0,
        "wc2": 0,
        "wc3": 0,
        "wc4": 0
    },
    "wp4": {
        "bedAngle": 0,
        "wc1": 0,
        "wc2": 0,
        "wc3": 0,
        "wc4": 0
    }
}
function createClient() {
    readline.question("Enter server ip address(Ex:192.168.43.195) - ", (host) => {
        readline.question("Enter server port(Ex:55555) - ", (port) => {
            readline.question("Number of client - ", (num) => {
                let number = JSON.parse(num)
                let intervalArray = []
                let intervals = []
                const options = {
                    host: host,
                    port: port,
                };
                if (number === 0) {
                    return;
                }
                for (let i = 0; i < JSON.parse(number); i++) {
                    telemetryData.webClient = `web-client${i + 1}`
                    intervalArray.push(Math.floor(Math.random() * (10 - 5 + 1)) + 5)
                    console.log(intervalArray)
                    intervals.push(
                        setInterval(() => {
                            let webClient = net.connect(options, () => {
                                webClient.write(JSON.stringify(`web-client${i + 1}`), () => {
                                    webClient.end()
                                })
                            });
                        }, intervalArray[i])
                    )
                }
            });
        });
    });

}

createClient();