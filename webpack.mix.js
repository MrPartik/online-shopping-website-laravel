const mix = require('laravel-mix');
const resource_directory_js = 'resources/js';
const bundle_directory_js = 'resources/js/bundle';
const resource_directory_css = 'resources/css';
const bundle_directory_css = 'resources/css/bundle';
const public_directory = 'public';
const public_directory_css = 'public/css';
const public_directory_js = 'public/js';
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/**
 * @type {{oBundle: oMinifyJs.oBundle, oMinify: oMinifyJs.oMinify}}
 */
var oMinifyJs = {
    oBundle: () => {
        mix.scripts([
            resource_directory_js + '/adminlte.js',
        ], bundle_directory_js + '/adminlte.bundle.js');
   
    },
    oMinify: () => {
        mix.webpackConfig({
            entry: {
                adminlte_assets: ['@babel/polyfill/noConflict', './' + bundle_directory_js + '/adminlte.bundle.js']
            },
            output: {
                filename: '[name].min.js',
                path: path.resolve(__dirname, public_directory_js)
            },
            mode: 'production',
            module: {
                rules: [{
                    test: /\.js$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: 'babel-loader'
                }]
            },
        });
    }
   };

/**
 * npm install @node-minify/core @node-minify/clean-css
 * @type {{oBundle: oMinifyCss.oBundle, oMinify: oMinifyCss.oMinify}}
 */
var oMinifyCss = {
    oBundle: () => {
        mix.styles([
            resource_directory_css + '/design/adminlte.css',
        ], bundle_directory_css + '/adminlte.bundle.css');
    },
    oMinify: () => {
        minify({
            compressor : cleanCSS,
            input      : bundle_directory_css + '/adminlte.bundle.css',
            output     : public_directory_css + '/adminlte_assets.min.css',
            callback   : function(err, min) {}
        });
    }
   };

// oMinifyJs.oBundle();
// oMinifyJs.oMinify();

// oMinifyCss.oBundle();
// oMinifyCss.oMinify();
