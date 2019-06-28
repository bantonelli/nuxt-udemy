<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="updatePost"/>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm';
import axios from 'axios';

export default {
    components: {
        AdminPostForm
    },
    asyncData(context) {
        return axios.get(`${process.env.firebaseUrl}posts/${context.params.postId}.json`)
        .then((res) => {
            return {loadedPost: {...res.data, id: context.params.postId}};
        })
        .catch((err) => {
            return context.error(err);
        });
    },
    methods: {
        updatePost(editedPost) {
            // console.log(this.$route.params);
            this.$store.dispatch('editPost', {...editedPost, id: this.$route.params.postId})
            .then(() => {
                this.$router.push('/admin');
            });
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
