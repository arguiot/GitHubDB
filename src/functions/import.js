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
