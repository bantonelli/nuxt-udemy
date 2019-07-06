<template>
    <div class="admin-page">
        <section class="new-post">
            <app-button @click="$router.push('/admin/new-post')">Create Post</app-button>
            <app-button style="margin-left: 10px;" @click="onLogout">Logout</app-button>
        </section>
        <section class="existing-posts">
            <h1>Existing Posts</h1>
            <PostList :is-admin="true" :posts="loadedPosts" />
        </section>
    </div>
</template>

<script>
import setTimeoutPromise from '~/middleware/setTimeoutPromise.js';

export default {
    layout: 'admin',
    computed: {
        loadedPosts() {
            return this.$store.getters.loadedPosts;
        }
    },
    methods: {
        onLogout() {
            this.$store.dispatch('logout');
            this.$router.push('/admin/auth');
        }
    }
    // async asyncData() {
    //     let data = await setTimeoutPromise();
    //     return { loadedPosts: data.loadedPosts };
    // }
}
</script>

<style scoped>
.admin-page {
    padding: 20px;
}

.new-post {
    text-align: center;
    border-bottom: 2px solid #ccc; 
    padding-bottom: 10px; 
}

.existing-posts > h1 {
    text-align: center;
}

</style>
