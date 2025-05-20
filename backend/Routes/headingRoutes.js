const express = require('express');
const router = express.Router();
const Heading = require('../model/Heading');
const UserProgress = require('../model/UserProgress');
const authMiddleware = require('../Middleware/auth'); 

router.post('/', async (req, res) => {
  try {
    const heading = new Heading(req.body);
    await heading.save();
    res.status(201).json(heading);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/with-progress', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const headings = await Heading.find({}).lean();
    const progress = await UserProgress.find({ userId }).lean();

    const progressMap = {};
    progress.forEach(p => {
      progressMap[p.subheadingId.toString()] = p.status;
    });

    const result = headings.map(h => ({
      ...h,
      subheadings: h.subheadings.map(sub => ({
        ...sub,
        status: progressMap[sub._id.toString()] || 'Pending',
      }))
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.post('/:id/subheadings', async (req, res) => {
  try {
    const heading = await Heading.findById(req.params.id);
    heading.subheadings.push(req.body);
    await heading.save();
    res.status(201).json(heading);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/user-progress/:subheadingId', authMiddleware, async (req, res) => {
  const { subheadingId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    await UserProgress.findOneAndUpdate(
      { userId, subheadingId },
      { status },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Progress updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:headingId/subheadings/:subId', async (req, res) => {
  try {
    const heading = await Heading.findById(req.params.headingId);
    heading.subheadings.id(req.params.subId).remove();
    await heading.save();
    res.json({ message: 'Subheading removed' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
