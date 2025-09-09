'use strict';

const store = require('../data/mockStore');

function createToken() {
  return `token_${Math.random().toString(36).slice(2)}${Date.now()}`;
}

class AuthController {
  // PUBLIC_INTERFACE
  /**
   * Register a new user (mock)
   * body: { email, password, name }
   */
  register(req, res) {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (store.users.find((u) => u.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const newUser = {
      id: store.genId('u'),
      email,
      password, // plaintext for mock
      name: name || email.split('@')[0],
    };
    store.users.push(newUser);
    const token = createToken();
    store.sessions.set(token, newUser.id);
    return res.status(201).json({
      token,
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Login (mock)
   * body: { email, password }
   */
  login(req, res) {
    const { email, password } = req.body || {};
    const user = store.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = createToken();
    store.sessions.set(token, user.id);
    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  }
}

module.exports = new AuthController();
