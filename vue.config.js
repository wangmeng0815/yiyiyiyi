
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8089,
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://192.168.3.20:8081/',
        target: 'http://itserver.top/',
        ws: true,
        secure: false,
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
        changOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if(val instanceof HtmlWebpackPlugin){
        val.options.title = '壹疑以议--推理馆';
        val.options.description = '这里有最好玩的剧本，最有趣的伙伴，最优美的环境，最贴心的服务';
      }
    })
  }
};
