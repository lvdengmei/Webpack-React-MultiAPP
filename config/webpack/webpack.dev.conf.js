const webpack = require('webpack');
const opn = require('opn');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const webpackFile = require("./webpack.file.conf");

let config = merge(baseWebpackConfig,{
    mode:"development",
    output:{
        path:path.resolve(webpackFile.devDirectory),
        filename:"js/[name].js",
        chunkFilename:"js/[name].js",
        publicPath:""
    },
    optimization:{
        //包清单
        runtimeChunk:{
            name:"manifest"
        },
        //拆分公共包
        splitChunks:{
            cacheGroups:{
                //项目公共组件
                common:{
                    chunks:"initial",
                    name:"common",
                    minChunks:2,
                    maxInitialRequests:5,
                    minSize:0
                },
                vendor:{
                    test:/node_modules/,
                    chunks:"initial",
                    name:"vendor",
                    priority:10,
                    enforce:true
                }
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:[
                    'cache-loader',
                    'babel-loader'
                ],
                include:[
                    path.resolve(__dirname,"../../app"),
                    path.resolve(__dirname,"../../entryBuild")
                ],
                exclude:[
                    path.resolve(__dirname,"../../node_modules")
                ]
            },
            {
                test:/\.(css|pcss)$/,
                loader:'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap',
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpg|gif|eot|woff|woff2|svg|swf)$/,
                loader:'file-loader?name=[name].[ext]&outputPath='+webpackFile.resource+'/'
            }
        ]
    },
    devServer:{
        host:"0.0.0.0",
        port:8080,
        hot:true,
        inline:true,
        contentBase:path.resolve(webpackFile.devDirectory),
        historyApiFallback:true,
        disableHostCheck:true,
        proxy:[
            {
                context:["/api/**","/u/**"],
                target:"http://127.0.0.1:8080/",
                secure:false
            }
        ],
        after(){
            opn("http://localhost:"+this.port);
        }
    }
});
module.exports = config;