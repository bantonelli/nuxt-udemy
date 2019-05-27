<template>
    <div class="admin-page">
        <section class="new-post">
            <app-button @click="$router.push('/admin/new-post')">Create Post</app-button>
        </section>
        <section class="existing-posts">
            <h1>Existing Posts</h1>
            <PostList :is-admin="true" :posts="loadedPosts" />
        </section>
    </div>
</template>

<script>
import PostList from '~/components/Posts/PostList';
<<<<<<< HEAD
import AppButton from '~/components/UI/AppButton';
import setTimeoutPromise from '~/middleware/setTimeoutPromise.js';
||||||| merged common ancestors
import AppButton from '~/components/UI-Components/AppButton';
=======
import AppButton from '~/components/UI/AppButton';
>>>>>>> 91b243b4a151bd7169ccb322d4214cd88edaa668

export default {
    components: {
        PostList,
        AppButton
    },
    layout: 'admin',
    async asyncData() {
        let data = await setTimeoutPromise();
        return { loadedPosts: data.loadedPosts };
    }
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
