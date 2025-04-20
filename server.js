const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// DEFINES BASIC STUFF

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Define Mongoose Schema
const courseSchema = new mongoose.Schema({
  name: String,
  desc: String,
  cost1: Number,
  cost2: Number,
  cost3: Number,
  cost4: Number,
  link1: String,
  link2: String
});

const Course = mongoose.model('Course', courseSchema);

// Define API routes
app.get('/', (req, res) => {
  res.send('Hello, Express & MongoDB Atlas!');
});

// Create (POST) a new course
app.post('/items', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read (GET) all courses
app.get('/items', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read (GET) a specific course by ID
app.get('/items/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Item not found' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update (PUT) a course by ID
app.put('/items/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete (DELETE) a course by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ error: 'Item not found' });
    res.json(deletedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
