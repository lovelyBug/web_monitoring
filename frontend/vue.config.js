module.exports = {
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: __dirname,
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/': {
          target: 'http://localhost:8011',
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