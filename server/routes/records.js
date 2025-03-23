import express from "express";
import Record from "../models/Record.js";

const router = express.Router();
router.use(express.json()); 

// @route   GET api/records
// @desc    Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records || []);
  } catch (err) {
    console.error('Error fetching records:', err.message);
    res.status(200).json([]);
  }
});

// @route   GET api/records/:id
// @desc    Get record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ msg: 'Record not found' });
    }
    
    res.json(record);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/records
// @desc    Create a record
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    const newRecord = new Record({
      name
    });
    
    const record = await newRecord.save();
    res.json(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/records/:id
// @desc    Update a record
router.put('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ msg: 'Record not found' });
    }
    
    const { name } = req.body;
    
    record.name = name;
    
    await record.save();
    res.json(record);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/records/:id
// @desc    Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ msg: 'Record not found' });
    }
    
    await Record.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Record removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;