const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Menambah note baru
router.post('/', (req, res) => {
  const { title, datetime, note } = req.body;
  const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  db.query(sql, [title, datetime, note], (err, result) => {
    if (err) {
      console.error('Error adding note:', err);
      res.status(500).send('Failed to add note');
      return;
    }
    res.status(201).send('Note added successfully');
  });
});

// Mendapatkan semua notes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM notes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching notes:', err);
      res.status(500).send('Failed to fetch notes');
      return;
    }
    res.json(results);
  });
});

// Mendapatkan satu note berdasarkan ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM notes WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching note:', err);
      res.status(500).send('Failed to fetch note');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Note not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Memperbarui note berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  db.query(sql, [title, datetime, note, id], (err, result) => {
    if (err) {
      console.error('Error updating note:', err);
      res.status(500).send('Failed to update note');
      return;
    }
    res.send('Note updated successfully');
  });
});

// Menghapus note berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM notes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting note:', err);
      res.status(500).send('Failed to delete note');
      return;
    }
    res.send('Note deleted successfully');
  });
});

module.exports = router;
