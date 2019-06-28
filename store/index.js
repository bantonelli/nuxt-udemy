import Vuex from 'vuex';
import setTimeoutPromise from '~/middleware/setTimeoutPromise';
import axios from 'axios';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            }, 
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex((post) => {
                    return post.id === editedPost.id;
                });
                state.loadedPosts[postIndex] = editedPost;
            }
        }, 
        actions: {
            nuxtServerInit(vuexContext, context) {
                // return setTimeoutPromise()
                // .then((data) => {
                //     vuexContext.commit('setPosts', data.loadedPosts);
                // });
                var newPosts = [];
                return axios.get(`${process.env.firebaseUrl}posts.json`)
                .then((res) => {
                    // console.log("RESPONSE DATA: ", res.data);
                    for (const key in res.data) {
                        // Each key is the id of a post 
                        // Then we can extrapolate the post object via spread operator.
                        // Push the post object onto the post array and commit 
                        // to the Vuex store. 
                        // console.log("KEY: ", key);
                        newPosts.push({ ...res.data[key], id: key });
                    }
                    vuexContext.commit('setPosts', newPosts);
                })
                .catch((err) => {
                    console.log(err);
                });
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts);
            },
            addPost(vuexContext, post) {
                const createdPost = {...post, updatedDate: new Date()};
                return axios.post(`${process.env.firebaseUrl}posts.json`, createdPost)
                .then((res) => {
                    vuexContext.commit('addPost', {...createdPost, id: res.data.name});
                });
            },
            editPost(vuexContext, editedPost) {
                return axios.put(`${process.env.firebaseUrl}posts/${editedPost.id}.json`, editedPost)
                .then((res) => {
                    // console.log(res);
                    // this.$router.push('/admin');
                    vuexContext.commit('editPost', editedPost);
                })
                .catch((err) => {
                    console.log(err);
                })                
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            }
        }
    });
}

export default createStore;