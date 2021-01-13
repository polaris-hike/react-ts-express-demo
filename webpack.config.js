const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');

module.exports = {
  mode:process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry:'./src/index.tsx',
  output:{
    path:path.join(__dirname,'src'),
    filename:'bundle.js'
  },
  devtool: 'source-map',
  devServer:{
    hot:true,
    contentBase:path.join(__dirname,'src'),
    historyApiFallback:{ // browserHistory 的时候，刷新会刷 404
      index:'./index.html'
    }
  },
  resolve:{
    alias :{
      "@":path.resolve(__dirname,'src'),
      "~":path.resolve(__dirname,'node_modules')
    },
    extensions:['.ts','.tsx','.js','.json']
  },
  module:{
    rules:[
      {
        test: /\.(j|t)sx?$/,
        loader:'ts-loader',
        options:{
          transpileOnly:true, // 只转移不检查
          getCustomTransformers:()=>({
            before:[
              tsImportPluginFactory({
                "libraryName":'antd',
                "libraryDirectory":'es',
                "style":'css'
              })]
          }),
          compilerOptions:{
            module: 'es2015'
          }
        },
        exclude:/node_modules/
      },
      {
        enforce:'pre',
        test: /\.(j|t)sx?$/,
        loader:'source-map-loader'
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use:['url-loader']
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}