const http = require("http");
const url = require("url");

class HttpError extends Error {
  constructor(code, message = "Uh oh, something went wrong.") {
    super(`${message} HTTP code ${code}`);
    this.code = code;
  }
}

const port = 3001;

const nodes = require("./nodes.json");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // all cors okay.
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  handleRequest(req, res);
});

async function handleRequest(req, res) {
  const urlParts = url.parse(req.url);
  try {
    switch (urlParts.pathname) {
      case "/api/nodes":
        handleGet(req, res, nodes);
        break;
      default:
        throw new HttpError(404);
    }
  } catch (ex) {
    console.error(ex);

    res.writeHead(ex.code || 500);
    res.write(ex.message);
    res.end();
  }
}

function handleGet(req, res, data, filters) {
  if (req.method !== "GET") {
    throw new HttpError(405);
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(data, 0, 2));
  res.end();
}

server.listen(port, function () {
  console.log("Server listening on: http://localhost:%s", port);
});
