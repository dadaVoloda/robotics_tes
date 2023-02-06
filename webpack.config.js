const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const mode = env.mode || 'development'
  const PORT = env.port || 3000
  const isDev = mode === 'development'
  const target = isDev ? 'web' : 'browserslist'
  const devtool = isDev ? 'inline-source-map' : undefined
  const devServer = isDev ? { port: PORT, open: true } : undefined

  return {
    mode,
    target,
    devtool,
    devServer,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('postcss-preset-env')],
                },
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.woff2?$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
          },
          use: isDev
            ? []
            : [
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                    },
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: [0.65, 0.9],
                      speed: 4,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    webp: {
                      quality: 75,
                    },
                  },
                },
              ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  }
}
