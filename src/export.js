// Browserify / Node.js
if (typeof define === "function" && define.amd) {
    define(() => new GHDB);
    // CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = new GHDB;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.GHDB = new GHDB;
} else if (typeof global !== "undefined") {
    global.GHDB = new GHDB;
}
