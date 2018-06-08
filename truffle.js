require('babel-register');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    }
  },
  rpc: {
    host: 'localhost',
    post: 8080
  }
};
