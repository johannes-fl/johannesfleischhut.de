const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

const postCSSPlugins = [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("postcss-hexrgba"),
    require("autoprefixer")
]

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap("Copy Images", function() {
            fse.copySync("./site/assets/images", "./docs/assets/images"); // nicht vergessen, docs bei echtem go-live zu dist umzubenennen
            fse.copySync("./site/assets/music", "./docs/assets/music") 
        })
    }
}

let cssConfig = {
    test: /\.css$/i, 
    use: ["css-loader?url=false", {loader: "postcss-loader", options: {plugins: postCSSPlugins}}]
    // "css-loader?url=false" bedeutet, nutze css-loader, aber nicht bei Bildern, die in CSS als Hintergrund o.ä. verwendet werden, diese sollen manuell hinzugefügt werden.
    }

let pages = fse.readdirSync("./site").filter(function(file) {
    return file.endsWith("html")
}).map(function(page) {
    return new HTMLWebpackPlugin({
        filename: page,
        template: `./site/${page}`,
        minify: false
    })
})

let config = {
    entry: "./site/assets/scripts/App.js", 
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }
}

if (currentTask == 'dev') {
    cssConfig.use.unshift("style-loader")
    config.output = {
        filename: "bundled.js", 
        path: path.resolve(__dirname, "site") // Root-Verzeichnis
    }
    config.devServer = {
        before: function(app, server) {
            server._watch("./site/**/*.html") // ** bedeutet, jegliche mögliche Ordner
        },
        contentBase: path.join(__dirname, "site"),
        hot: true, // on the fly
        port: 3000,
        host: "0.0.0.0" // macht den devServer von Geräten im selben Netzwerk sichtbar (local IP idress)
    }
    config.mode = "development"
}

if (currentTask == 'build') {
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }
    })
    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postCSSPlugins.push(require("cssnano"))
    config.output = {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js", 
        path: path.resolve(__dirname, "docs") // Root-Verzeichnis --> Wenn die Seite bei Github livegestellt werden soll, muss der Ordner "docs" heißen. Ansonsten ist "dist" für Distribution eher üblich.
    }
    config.mode = "production"

    // Lädt auch die Third Party Codefragmente (Vendors) (aus z.b. lazyload etc.) in eine eigene bundled Datei
    config.optimization = {
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
          }
    }
    
    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename: "styles.[chunkhash].css"}),
        new RunAfterCompile()
    )
}

module.exports = config