import Vuex from 'vuex';
import setTimeoutPromise from '~/middleware/setTimeoutPromise';

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
                return setTimeoutPromise()
                .then((data) => {
                    vuexContext.commit('setPosts', data.loadedPosts);
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