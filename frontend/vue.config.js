module.exports = {
  devServer: {
    proxy: {
      '/': {
          target: 'http://localhost:7001',
          changeOrigin: true
        }
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#6130F5',
          },
          javascriptEnabled: true
        }
      }
    }
  }
};