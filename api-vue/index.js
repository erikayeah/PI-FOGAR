const server = require("./src/app.js");
const PORT = 3002; // Diferente puerto al servidor de React

server.listen(PORT, () => {
  console.log(`Vue API Server listening at ${PORT}`);
});
