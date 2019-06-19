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
import backends from '~/middleware/backends';

export default {
    components: {
        AdminPostForm
    },
    asyncData(context) {
        return axios.get(`${backends.firebase}posts/${context.params.postId}.json`)
        .then((res) => {
            return {loadedPost: res.data};
        })
        .catch((err) => {
            return context.error(err);
        });
    },
    methods: {
        updatePost(editedPost) {
            axios.put(`${backends.firebase}posts/${this.$route.params.postId}.json`, editedPost)
            .then((res) => {
                // console.log(res);
                this.$router.push('/admin');
            })
            .catch((err) => {
                console.log(err);
            })
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
