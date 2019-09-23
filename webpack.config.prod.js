const path = require('path')
const WorkerPlugin = require('worker-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  plugins: [
    new WorkerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
