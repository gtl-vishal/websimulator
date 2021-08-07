const net = require("net"); // import net

// create the server
let server = net.createServer(connection => {
    // run all of this when a client connects
    console.log("new connection");
    connection.on("data", data => {
        // run this when data is received
        if (data == undefined || data == null) {
            return;
        }
        const dataArgs = data.toString().split(" "); // splits the data into spaces
        console.log(dataArgs)
    });
});
// look for a connection on port 50,000
server.listen(50000, () => {
    console.log(`Listening on port 50000`); // prints on start
});