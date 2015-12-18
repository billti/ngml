var pluginFactories = [];

var config = {
    plugins: ["./plugin/plugin.js"]
};
function loadPlugin(path, text) {
    text += "\n" + '//# sourceURL=' + path;
    var tmpFunc = new Function("pluginFactories", text);
    tmpFunc(pluginFactories);
}

function runPlugins() {
    console.log("running plugins");
    pluginFactories.forEach(function (factory) {
        var instance = factory();
        instance("the host!");
    });
}
var pluginPromises = config.plugins.map(function (pluginPath) { return fetch(pluginPath)
    .then(function (resp) { return resp.text(); }) // text() returns another promise for the body
    .then(function (body) { return loadPlugin(pluginPath, body); }); });
// Wait until the above have loaded before running
Promise.all(pluginPromises).then(function () { return runPlugins(); });
