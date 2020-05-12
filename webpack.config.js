
const path = require("path")
const postCSSPlugins = [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("postcss-hexrgba"),
    require("autoprefixer")
]
module.exports = {
    entry: "./site/assets/scripts/App.js", 
    output: {
        filename: "bundled.js", 
        path: path.resolve(__dirname, "site") // Root-Verzeichnis
    },
    devServer: {
        before: function(app, server) {
            server._watch("./site/**/*.html") // ** bedeutet, jegliche mögliche Ordner
        },
        contentBase: path.join(__dirname, "site"),
        hot: true, // on the fly
        port: 3000,
        host: "0.0.0.0" // macht den devServer von Geräten im selben Netzwerk sichtbar (local IP idress)
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i, 
                use: ["style-loader", "css-loader?url=false", {loader: "postcss-loader", options: {plugins: postCSSPlugins}}]
                // "css-loader?url=false" bedeutet, nutze css-loader, aber nicht bei Bildern, die in CSS als Hintergrund o.ä. verwendet werden, diese sollen manuell hinzugefügt werden.
            }
        ]
    }
}

