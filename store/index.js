import Vuex from 'vuex';
import setTimeoutPromise from '~/middleware/setTimeoutPromise';
import axios from 'axios';
import backends from '~/middleware/backends';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            }
        }, 
        actions: {
            nuxtServerInit(vuexContext, context) {
                // return setTimeoutPromise()
                // .then((data) => {
                //     vuexContext.commit('setPosts', data.loadedPosts);
                // });
                var newPosts = [];
                return axios.get(`${backends.firebase}posts.json`)
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