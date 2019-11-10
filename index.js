const express = require('express')
const cors = require('cors')
const blogRouter = require('./blog/blogRoutes')
const server = express()

server.use(express.json())
server.use('/api/posts', blogRouter)
server.use(cors())

server.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});