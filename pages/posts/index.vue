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
    // async fetch (context) {
    //     if (context.store.state.loadedPosts.length !== 0) {
    //         let data = await setTimeoutPromise();
    //         context.store.dispatch('setPosts', data.loadedPosts);
    //     } else {
    //         return null;
    //     }
    //     // return { loadedPosts: data.loadedPosts };
    // },
    computed: {
        loadedPosts () {
            return this.$store.getters.loadedPosts;
        }
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

