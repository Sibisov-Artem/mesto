// webpack.js.org/configuration or /concepts
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');            //импортируем html-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //подключаем MiniCssExtractPlugin - создает файл CSS для каждого файла JS, который содержит CSS

module.exports = {              //экспортируем настройки (объектик с определенными свойствами)
  entry: './src/pages/index.js',  //вход - откуда будет начинаться сборка
  output: {                       // выход - куда будет производиться сборка
    path: path.resolve(__dirname, 'dist'), //указываем папку где будет результат сборки (dist)
    filename: 'main.js',                // указываем название файла, в котором результат сборки
    clean: true                       // для очистки папки перед каждой новой сборки (пересборки)
    // publicPath: ''
  },

  mode: 'development',
  devServer: {
    port: 8000, //указываем порт на котором нужно поднять, если не указывать по умолчанию 8080
    compress: true,  // просим чтобы код сжимался , за счет чего он был бы шустрее (это по умолчанию)
    hot: true,       //перезагрузка страницы при изменении кода (это по умолчанию) но указываем чтоб наверняка
    open: true       // сайт будет открываться сам при запуске npm run dev
  },
  devtool: 'inline-source-map',

  module: {
    rules: [              // rules — это массив правил
      {                   //перечисляем правила к тому, что здесь есть.
        //для того чтобы правило заработало для скриптовых файлов пишут регулярные выражения ,
        //которые натравливаются на определенные расширения у файлов
        test: /\.js$/,          //в данном случае для всех файлов .js
        use: 'babel-loader',     // используем этот пакет
        exclude: '/node_modules/'  //указываем исключение где не нужно производить обработку
      },
      {
        test: /\.css$/,           //в данном случае для всех файлов .css
        use: [MiniCssExtractPlugin.loader, {     // используем этот пакет, достаем из плагина loader
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
          'postcss-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,  //перечисляем расширения
        type: 'asset/resource'        //сообщаем, что это статичные ресурсы
      },

    ]
  },
  plugins: [             //добавляем сюда отдельную секцию для плагина

    new HtmlWebpackPlugin({// передаем путь до файла, который будет являться для него template с html-кодом
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}
