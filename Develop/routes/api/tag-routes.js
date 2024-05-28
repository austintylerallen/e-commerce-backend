const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  console.log('GET request to /api/tags');
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).json(err);
  }
});

// GET a single tag by ID
router.get('/:id', async (req, res) => {
  console.log('GET request to /api/tags/:id', req.params.id);
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      console.log('No tag found with id:', req.params.id);
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error('Error fetching tag:', err);
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  console.log('POST request to /api/tags', req.body);
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.error('Error creating tag:', err);
    res.status(400).json(err);
  }
});

// PUT update a tag by ID
router.put('/:id', async (req, res) => {
  console.log('PUT request to /api/tags/:id', req.params.id, req.body);
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tag[0]) {
      console.log('No tag found with id:', req.params.id);
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag updated' });
  } catch (err) {
    console.error('Error updating tag:', err);
    res.status(400).json(err);
  }
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
  console.log('DELETE request to /api/tags/:id', req.params.id);
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tag) {
      console.log('No tag found with id:', req.params.id);
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted' });
  } catch (err) {
    console.error('Error deleting tag:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
