const express = require('express');
const cors = require('cors'); 
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Define a route to handle incoming requests
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// In-memory data store (replace with a database in production)
const data = [
    // { id: 1, name: "", desc: "", cost1: 1, cost2: 2, cost3: 3, link1: "", link2: ""},
    { id: 1, name: "Kurs PHP", desc: "Prosty kurs z PHP, omawia podstawy dla początkujących", cost1: 10, cost2: 20, cost3: 30, cost4: 10, link1: "https://youtu.be/a7_WFUlFS94?si=6PhLqI8_ukYeF9bR", link2: "https://www.w3schools.com/php/"},
    { id: 2, name: "Kurs Python", desc: "Prosty kurs z Pythona, omawia podstawy!", cost1: 10, cost2: 30, cost3: 50, cost4: 20, link1: "https://www.youtube.com/watch?v=x7X9w_GIm1s", link2: "https://www.w3schools.com/python/"},
    { id: 3, name: "Kurs JS", desc: "Kurs z JS dla początkujących", cost1: 40, cost2: 135, cost3: 200, cost4: 100, link1: "https://youtu.be/DHjqpvDnNGE?si=04QpFt4ONxCHxvA9", link2: "https://www.w3schools.com/js/"},
    { id: 4, name: "Kurs C#", desc: "Kurs z C# wstęp do zagadnienia", cost1: 15, cost2: 20, cost3: 25, cost4: 5, link1: "https://youtu.be/ravLFzIguCM?si=Dybrcc3BZlU95jyD", link2: "https://www.w3schools.com/cs/index.php"},
    { id: 5, name: "Kurs TS", desc: "Kurs z TypeScript bazujący na wiedzy z kursu JS", cost1: 40, cost2: 100, cost3: 120, cost4: 100, link1: "https://youtu.be/zQnBQ4tB3ZA?si=Hk1Mb06CH8J9r2om", link2: "https://www.w3schools.com/typescript/"},

  ];

  // Middleware to parse JSON requests
app.use(express.json());

// Create (POST) a new item
app.post('/items', (req, res) => {
  
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Read (GET) all items
app.get('/items', (req, res) => {
  res.json(data);
});

// Read (GET) a specific item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Update (PUT) an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
  }
});

// Delete (DELETE) an item by ID
app.delete('/items/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        const deletedItem = data.splice(index, 1);
        res.json(deletedItem[0]);
      }
});