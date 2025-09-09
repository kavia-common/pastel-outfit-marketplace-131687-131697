/**
 * Cart controller.
 */
const cartService = require('../services/cart');

// PUBLIC_INTERFACE
function getCart(req, res, next) {
  /** Get current user's cart. */
  try {
    const cart = cartService.getCart(req.user.sub);
    res.json({ status: 'ok', cart });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function addItem(req, res, next) {
  /** Add item to cart. */
  try {
    const { productId, qty } = req.body;
    const cart = cartService.addItem(req.user.sub, productId, qty || 1);
    res.status(201).json({ status: 'ok', cart });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function updateItem(req, res, next) {
  /** Update item quantity. */
  try {
    const { qty } = req.body;
    const cart = cartService.updateItem(req.user.sub, req.params.productId, qty);
    res.json({ status: 'ok', cart });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function removeItem(req, res, next) {
  /** Remove item from cart. */
  try {
    const cart = cartService.removeItem(req.user.sub, req.params.productId);
    res.json({ status: 'ok', cart });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function clear(req, res, next) {
  /** Clear cart. */
  try {
    const cart = cartService.clearCart(req.user.sub);
    res.json({ status: 'ok', cart });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function totals(req, res, next) {
  /** Cart totals. */
  try {
    const t = cartService.totals(req.user.sub);
    res.json({ status: 'ok', totals: t });
  } catch (e) {
    next(e);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem, clear, totals };
