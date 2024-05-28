const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories
router.get('/', async (req, res) => {
  console.log('GET request to /api/categories');
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json(err);
  }
});

// GET one category by ID
router.get('/:id', async (req, res) => {
  console.log('GET request to /api/categories/:id', req.params.id);
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      console.log('No category found with id:', req.params.id);
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    console.log('Category found:', category);
    res.status(200).json(category);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  console.log('POST request to /api/categories', req.body);
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(400).json(err);
  }
});

// PUT update a category by ID
router.put('/:id', async (req, res) => {
  console.log('PUT request to /api/categories/:id', req.params.id, req.body);
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!category[0]) {
      console.log('No category found with id:', req.params.id);
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category updated' });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(400).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  console.log('DELETE request to /api/categories/:id', req.params.id);
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!category) {
      console.log('No category found with id:', req.params.id);
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
