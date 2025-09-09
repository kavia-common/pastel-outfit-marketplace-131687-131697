/**
 * Products controller.
 */
const productService = require('../services/products');

// PUBLIC_INTERFACE
function list(req, res, next) {
  /** List products. */
  try {
    const result = productService.list({
      q: req.query.q,
      tag: req.query.tag,
      page: Number(req.query.page || 1),
      pageSize: Number(req.query.pageSize || 20)
    });
    res.json({ status: 'ok', ...result });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function get(req, res, next) {
  /** Get product by ID. */
  try {
    const p = productService.getById(req.params.id);
    res.json({ status: 'ok', product: p });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function create(req, res, next) {
  /** Create product (admin demo). */
  try {
    const prod = productService.create(req.body);
    res.status(201).json({ status: 'ok', product: prod });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function update(req, res, next) {
  /** Update product (admin demo). */
  try {
    const prod = productService.update(req.params.id, req.body);
    res.json({ status: 'ok', product: prod });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function remove(req, res, next) {
  /** Soft delete (admin demo). */
  try {
    const result = productService.remove(req.params.id);
    res.json({ status: 'ok', ...result });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, get, create, update, remove };
