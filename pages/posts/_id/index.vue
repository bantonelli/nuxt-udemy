<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{ loadedPost.title }}</h1>
            <div class="post-details">
                <div class="post-detail">Last Updated on {{loadedPost.updatedDate}}</div>
                <div class="post-detail">Written by {{loadedPost.author}}</div>
            </div>
            <p class="post-content">{{loadedPost.content}}</p>
        </section>
        <section class="post-feedback">
            <p>Let me know what you think about the post, send a mail to <a href="mailto:feedback@mydomain.com">feedback@mydomain.com</a></p>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    asyncData(context) {
      return axios.get(`${process.env.firebaseUrl}posts/${context.params.id}.json`)
      .then((res) => {
        // console.log('RESPONSE: ', res.data);
        return {loadedPost: res.data};
      })
      .catch((err) => {
        return context.error(err);
      });
		// return new Promise((resolve, reject) => {
		// 	setTimeout(() => {
		// 		var post = {
		// 			id: "1",
		// 			author: "Brandon",
		// 			updatedDate: new Date(),
		// 			title: "First Post (ID: " + context.params.id + ")",
		// 			previewText: "This is our first post!",
		// 			content: 'Some dummy text which is definitely not the preview text though!',
		// 			thumbnail: "https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg"	
		// 		};
		// 		if (context.params.id == post.id) {
		// 			resolve(post);
		// 		} else {
		// 			reject(new Error("IDs Don't Match!"));					
		// 		}
		// 	}, 1000);
		// })
		// .then((result) => {
		// 	return { loadedPost: result };
		// })
		// .catch((error) => {
		// 	context.error(error);
		// });
	}
}
</script>


<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
