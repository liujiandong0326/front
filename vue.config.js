const { defineConfig } = require("@vue/cli-service");
// 导入 compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      // gzip 压缩的格式还需要配置 nginx
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch"); //关闭预拉取插件，配合路由懒加载
  },
});
