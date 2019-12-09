const express = require('express');
const database = require('../data/db');
const router = express.Router()

router.post("/", (req, res) => {
  const { title, contents } = req.body
  !title || !contents 
    ? res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
    : database
      .insert(req.body)
      .then(data => {
        res.status(201).json({
          ...data, ...req.body
        })
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        })
      })
})

router.post("/:id/comments", (req, res) => {
  const { id } = req.params
  const { text } = req.body

  database
    .findById(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
        })
      }
    })
  !text 
    ? res.send(400).json({
      errorMessage: "Please provide text for the comment."
    })
    : database
      .insertComment({ post_id: id, ...req.body })
      .then(data => {
        res.status(201).json({
          ...data, ...req.data
        })
      })
      .catch(() => {
        res.status(500).json({
          error: "The posts information could not be retrieved."
        })
      })
 
})

router.get("/", (req, res) => {
  database
    .find()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      })
    })
})

router.get("/:id", (req, res) => {
  const { id } = req.params

  database
    .findById(id)
    .then(data => {
      return data 
      ? res.status(200).json({ ...data, id})
      : res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    })
    .catch(() => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      })
    })
    
})

router.get("/:id/comments", (req, res) => {
  const { id } = req.params
  
  database
    .findCommentById(id)
    .then(data => {
      return data
      ? res.status(200).json({ ...data, id })
      : res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    })
    .catch(() => {
      res.status(500).json({
        error: "The comments information could not be retrieved."
      })
    })

})

router.delete("/:id", (req, res) => {
  const { id } = req.params

  database
    .remove(id)
    .then(data => {
      return data
      ? res.status(200).json({ ...data, id })
      : res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    })
    .catch(() => {
      res.status(500).json({
        error: "The post could not be removed."
      })
    })
})

router.put("/:id", (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }
  database.findById(id)
    .then(data => {
      if (data) {
        return database.update(id, req.body)
      }
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
      })
    })
    .then(() => { database.findById(id)
    .then(data => res.status(200).json({ ...data, id }))
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
  })
})

module.exports = router;