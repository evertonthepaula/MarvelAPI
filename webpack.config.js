const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HWPConfig = new HtmlWebpackPlugin({
	template: path.resolve(__dirname, 'src/index.html'),
	file: 'index.html',
	inject: 'body',
});

module.exports = {
	entry: './src/assets/js/main.js',

	output:{
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},

	plugins:[HWPConfig,new Dotenv()],

	devtool: "source-map", 
	
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: "eslint-loader",
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {	
						presets: ['env']
					}
				}
			},
			{
		        test: /\.scss$/,
		        use: [{
		            loader: "style-loader" // creates style nodes from JS strings
		        }, {
		            loader: "css-loader" // translates CSS into CommonJS
		        }, {
		            loader: "sass-loader" // compiles Sass to CSS
		        }]
		    },
		    {
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
		  	},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{ test: /\.jpg$/, use: [ "file-loader" ] },
      		{ test: /\.png$/, use: [ "url-loader?mimetype=image/png" ] }
		]
	}
}
