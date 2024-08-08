const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
require("dotenv").config();

module.exports = {
	entry: {
		index: "./src/index.js",
		details: "./src/pages/details/details.js",
		contact: "./src/pages/contact/contact.js",
	},
	output: {
		filename: "[name].[hash:8].js",
		sourceMapFilename: "[name].[hash:8].map",
		chunkFilename: "[id].[hash:8].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "",
		clean: true,
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: "src/assets", to: "assets" }],
		}),
		new webpack.DefinePlugin({
			"process.env.BASE_URL": JSON.stringify(process.env.NODE_ENV === "development" ? "/" : "/practice-api/"),
		}),
		new HtmlWebpackPlugin({
			base: process.env.BASE_URL,
			filename: "index.html",
			title: "Home Page",
			template: "src/index.html",
			inject: "body",
			chunks: ["index"],
		}),
		new HtmlWebpackPlugin({
			base: process.env.BASE_URL,
			filename: "details.html",
			title: "Details Page",
			template: "src/pages/details/details.html",
			inject: "body",
			chunks: ["details"],
		}),
		new HtmlWebpackPlugin({
			base: process.env.BASE_URL,
			filename: "contact.html",
			title: "Contact Page",
			template: "src/pages/contact/contact.html",
			inject: "body",
			chunks: ["contact"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, "src"),
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	optimization: {
		runtimeChunk: "single",
	},
};
