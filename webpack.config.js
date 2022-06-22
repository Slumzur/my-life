const path = require("path");
const webpack = require("webpack");

const params = {
    stage: {
        __API_HOST__: "'***'"
    },
    stage_branch: {
        __API_HOST__: "'***'"
    },
    production: {
        __API_HOST__: "'***'"
    },
    dev: {
        __API_HOST__: "'***'"
    }
}


module.exports = (env, argv) => {
    return {
        entry: {
            newPoraPage: ["babel-polyfill", "./src/index.js"],
        },
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "form_" + env.type + ".js"
        },
        plugins: [
            new webpack.DefinePlugin(params[env.type])
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.(png|svg|jpg|gif|woff|woff2|ttf)$/,
                    use: "url-loader?name=[name].[ext]",
                },
                {
                    test: /\.css$/,
                    use: [{loader: "style-loader"}, {loader: "css-loader"}],
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
            ],
        },
    };
};
