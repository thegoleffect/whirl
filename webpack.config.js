// var Config = require('./config.json');
var Path = require('path');
var Webpack = require('webpack');
var I18nPlugin = require('i18n-webpack-plugin');

var languages = {
    'en': null,
    // 'de': require('./i18n/de.json');
};

// var localizationPlugin = new I18nPlugin(languages[language]);
var commonsPlugin = new Webpack.optimize.CommonsChunkPlugin('./shared.js');
var resolverPlugin = new Webpack.ResolverPlugin(
    new Webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
);
var definePlugin = new Webpack.DefinePlugin({
    __DEV__: JSON.stringify((process.env.DEVELOPMENT || false) === '1'),
    __PROD__: JSON.stringify((process.env.DEVELOPMENT || false) !== '1')
});
var optimizePlugin = new Webpack.optimize.UglifyJsPlugin({
    mangle: {
        except: ['$', 'exports', 'require']
    }
});

module.exports = Object.keys(languages).map(function (language) {
    return {
        name: language,
        entry: {
            index: './app/index.es6',
            // home: './app/home.es6', // logged in
            // admin: './app/admin.es6'
        },
        output: {
            path: './public/js',
            filename: '[name]' + (language === 'en' ? '' : '-' + language) + '.js'
        },
        resolve: {
            modulesDirectories: [
                'node_modules',
                'app/bower_components'
            ]
        },
        module: {
            loaders: [
                { test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
                { test: /\.css$/, loader: 'style-loader!css-loader' }
            ],
            // postLoaders: [
            //     { test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader' }
            // ]
        },
        plugins: [
            new I18nPlugin(languages[language]),
            definePlugin,
            resolverPlugin,
            commonsPlugin,
            optimizePlugin
        ]
    };
});