class HealthService {
  // PUBLIC_INTERFACE
  getStatus() {
    /** Return health status for service monitoring. */
    return {
      status: 'ok',
      message: 'Service is healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }
}

module.exports = new HealthService();
