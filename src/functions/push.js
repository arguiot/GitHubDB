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
