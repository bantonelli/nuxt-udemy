<template>
    <div class="posts-page">
        <PostList :posts="loadedPosts" />
    </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'
import setTimeoutPromise from '~/middleware/setTimeoutPromise'

export default {
    components: {
        PostList
    },
    async asyncData() {
        let data = await setTimeoutPromise();
        return { loadedPosts: data.loadedPosts };
    }    
}
</script>


<style scoped>
    .posts-page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

