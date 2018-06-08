"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*****************************************************

	                    GHDB
	=================================================
	Copyright © Arthur Guiot 2018. All right reserved.

******************************************************/
var GHDB = function () {
	function GHDB(repo, file, commiter, token) {
		_classCallCheck(this, GHDB);

		this.repo = repo;
		this.file = file;
		this.commiter = commiter;
		this.token = token;
	}

	_createClass(GHDB, [{
		key: "push",
		value: function push(data) {
			var _this = this;

			var sha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
			var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "GitHubDB update";

			return new Promise(function (resolve, reject) {
				var head = new Headers({
					"Authorization": "token " + _this.token
				});
				fetch(_this.genString, {
					method: "PUT",
					headers: head,
					body: "\n\t\t\t\t{\n\t\t\t\t\t\"message\": \"" + msg + "\",\n\t\t\t\t\t\"commiter\": {\n\t\t\t\t\t\t\"name\": \"" + _this.commiter.name + "\",\n\t\t\t\t\t\t\"email\": \"" + _this.commiter.email + "\",\n\t\t\t\t\t},\n\t\t\t\t\tcontent: \"" + (blob == false ? window.btoa(unescape(encodeURIComponent(JSON.stringify(data)))) : data) + "\",\n\t\t\t\t\t\"sha\": \"" + sha + "\"\n\t\t\t\t}\n\t\t\t\t"
				}).then(function (data) {
					return data.json();
				}).then(function (data) {
					if (data.message) {
						reject("Error somewhere. Check token or if the file exist");
					}
					resolve(data);
				});
			});
		}
	}, {
		key: "genString",
		get: function get() {
			return "https://api.github.com/repos/" + this.repo + "/contents/" + this.file;
		}
	}, {
		key: "import",
		get: function get() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				fetch(_this2.genString).then(function (data) {
					return data.json();
				}).then(function (data) {
					if (data.message) {
						reject("Error somewhere. Check token or if the file exist");
					}
					resolve(data);
				});
			});
		}
	}]);

	return GHDB;
}();
// Browserify / Node.js


if (typeof define === "function" && define.amd) {
	define(function () {
		return new GHDB();
	});
	// CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
	// Support Node.js specific `module.exports` (which can be a function)
	if (typeof module !== "undefined" && module.exports) {
		exports = module.exports = new GHDB();
	}
	// But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
	exports.GHDB = new GHDB();
} else if (typeof global !== "undefined") {
	global.GHDB = new GHDB();
}