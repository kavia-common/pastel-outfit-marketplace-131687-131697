'use strict';

const store = require('../data/mockStore');

class ProductsController {
  // PUBLIC_INTERFACE
  /**
   * Get all products
   * Returns the full catalog of pastel outfits.
   */
  list(req, res) {
    return res.status(200).json({
      data: store.products,
      count: store.products.length,
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Get product by ID
   * Returns a single product by its ID.
   */
  getById(req, res) {
    const { id } = req.params;
    const product = store.products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  }
}

module.exports = new ProductsController();
