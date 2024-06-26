const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  console.log('GET request to /api/products');
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    console.log('Products fetched successfully:', products);
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  console.log('GET request to /api/products/:id', req.params.id);
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      console.log('No product found with id:', req.params.id);
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    console.log('Product found:', product);
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  console.log('POST request to /api/products', req.body);
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    console.log('Product created successfully:', product);
    res.status(200).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  console.log('PUT request to /api/products/:id', req.params.id, req.body);
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    console.log('Product updated:', updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json(err);
  }
});

// delete product
router.delete('/:id', async (req, res) => {
  console.log('DELETE request to /api/products/:id', req.params.id);
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      console.log('No product found with id:', req.params.id);
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    console.log('Product deleted:', result);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
