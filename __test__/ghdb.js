/*****************************************************

	                    GHDB
	=================================================
	Copyright © Arthur Guiot 2018. All right reserved.

******************************************************/
class GHDB {
	constructor(repo, file, commiter, token) {
		this.repo = repo
		this.file = file
		this.commiter = commiter
		this.token = token
	}
	get genString() {
		return `https://api.github.com/repos/${this.repo}/contents/${this.file}`
	}
	get import() {
		return new Promise((resolve, reject) => {
			fetch(this.genString).then(data => data.json()).then(data => {
				if (data.message) {
					reject("Error somewhere. Check token or if the file exist")
				}
				resolve(data)
			})
		});
	}
	push(data, blob=false, sha="", msg="GitHubDB update") {
		return new Promise((resolve, reject) => {
			const head = new Headers({
				"Authorization": `token ${this.token}`
			})
			fetch(this.genString, {
				method: "PUT",
				headers: head,
				body: `
				{
					"message": "${msg}",
					"commiter": {
						"name": "${this.commiter.name}",
						"email": "${this.commiter.email}",
					},
					content: "${blob == false ? window.btoa(unescape(encodeURIComponent( JSON.stringify(data) ))) : data}",
					"sha": "${sha}"
				}
				`
			}).then(data => data.json()).then(data => {
				if (data.message) {
					reject("Error somewhere. Check token or if the file exist")
				}
				resolve(data)
			})
		});
	}
}
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