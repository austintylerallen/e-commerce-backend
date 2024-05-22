const Category = require('./Category');
const Product = require('./Product'); // Ensure this matches your table name
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = {
  Category,
  Product,
  Tag,
  ProductTag,
};
