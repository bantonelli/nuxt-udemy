<template>
	<section class="post-list">
		<post-preview
		:id="'1'"
		:is-admin="isAdmin"
		:title="'Title of Post'"
		:preview-text="'First Post'"
		:thumbnail="'https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg'"
		></post-preview>
		<post-preview
		:id="'2'"
		:is-admin="isAdmin"
		:title="'Title of Post'"
		:preview-text="'Second Post'"
		:thumbnail="'https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg'"
		></post-preview>
		<post-preview
		:id="'3'"
		:is-admin="isAdmin"
		:title="'Title of Post'"
		:preview-text="'Third Post'"
		:thumbnail="'https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg'"
		></post-preview>
	</section>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props: {
	  isAdmin: {
		  type: Boolean,
		  default: false
	  }
  }
}
</script>

<style scoped>
	.post-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
