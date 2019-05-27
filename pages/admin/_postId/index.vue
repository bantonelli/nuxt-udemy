<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" />
        </section>
    </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm';

export default {
    components: {
        AdminPostForm
    },
    data () {
        return {
            loadedPost: {
                author: "Brandon",
                title: "My Awesome Post",
                thumbnailLink: 'https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg',
                content: "WOW this is super amazing thanks for that!"
            }
        }
    },
    layout: 'admin'
};
</script>


<style scoped>
.update-form {
    width: 90%;
    margin: 20px auto;
}

@media (min-width: 768px) {
    .update-form {
        width: 500px;
    }
}
</style>
