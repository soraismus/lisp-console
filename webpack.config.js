var exampleConfig = {
    entry: './app/app.jsx',
    output: {
        path : './app',
        filename: 'bundle.js',
    },
    cache : true,
    watch : true,
    devtool: "eval",
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader?harmony'
            }
        ]
    },
    resolve : {
        extensions : ['', '.js', '.jsx']
    }
};

module.exports = {
  node: {
    fs: "empty"
  }
};
