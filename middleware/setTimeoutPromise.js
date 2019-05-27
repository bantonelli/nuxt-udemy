function setTimoutPromise () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				loadedPosts: [
				{
					id: "1",
					title: "First Post",
					previewText: "This is our first post!",
					thumbnail:
					"https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg"
				},
				{
					id: "2",
					title: "Second Post",
					previewText: "This is our second post!",
					thumbnail:
					"https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg"
				}
				]
			});
		}, 1000);
	});
}

export default setTimoutPromise;