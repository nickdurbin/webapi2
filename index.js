const express = require('express')
const cors = require('cors')
const postRouter = require('./posts/postRoutes')
const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/posts', postRouter)

server.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});