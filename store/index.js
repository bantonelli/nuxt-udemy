import Vuex from 'vuex';
import setTimeoutPromise from '~/middleware/setTimeoutPromise';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
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
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
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
                return axios.post(`${process.env.firebaseUrl}posts.json?auth=${vuexContext.state.token}`, createdPost)
                .then((res) => {
                    vuexContext.commit('addPost', {...createdPost, id: res.data.name});
                });
            },
            editPost(vuexContext, editedPost) {
                return axios.put(`${process.env.firebaseUrl}posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
                .then((res) => {
                    // console.log(res);
                    // this.$router.push('/admin');
                    vuexContext.commit('editPost', editedPost);
                })
                .catch((err) => {
                    console.log(err);
                })                
            },
            authenticateUser(vuexContext, authData) { 
                let authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + process.env.fbAPIKey;
                if (!authData.isLogin) {
                    authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.fbAPIKey;
                } 
                return this.$axios
				.$post(authUrl,
					{
						email: authData.email,
						password: authData.password,
						returnSecureToken: true
					}
				)
				.then(res => {
                    // console.log("RESULT: ", res);
                    vuexContext.commit('setToken', res.idToken);                    
                    if (process.client) {
                        localStorage.setItem('token', res.idToken)
                        var expirationDate = (new Date().getTime()) + res.expiresIn * 1000; 
                        localStorage.setItem('tokenExpiration', expirationDate);
                        Cookie.set('jwt', res.idToken);
                        Cookie.set('expirationDate', expirationDate);
                    }
                    return this.$axios.post('http://localhost:3000/api/track-data', {
                        data: 'Authenticated'
                    });                    
				})
				.catch(err => {
					console.log(err);
				});
            },
            initAuth(vuexContext, req) {
                // Can check if on the server via the request that comes in 
                // Basically the request is received by the middleware that calls this action and can be passed to the action. 
                let token = null;
                let expirationDate = null;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    // Produces an array of cookie items 
                    const cookies = req.headers.cookie.split(';');
                    const jwtCookie = cookies.find((cookie) => {
                        // trim the cookie / item in the array because they may have extra spaces. 
                        return cookie.trim().startsWith('jwt=');
                    });
                    if (!jwtCookie) {
                        return;
                    } 
                    token = jwtCookie.split('=')[1];

                    const expirationDateCookie = cookies.find((cookie) => {
                        // trim the cookie / item in the array because they may have extra spaces. 
                        return cookie.trim().startsWith('expirationDate=');
                    });
                    if (!expirationDateCookie) {
                        return;
                    } 
                    expirationDate = expirationDateCookie.split('=')[1];
                } else {
                    token = localStorage.getItem('token');
                    expirationDate = parseInt(localStorage.getItem('tokenExpiration'));
                }
                if (new Date().getTime() < expirationDate && token) {
                    console.log("Valid token!");
                    vuexContext.commit('setToken', token);
                } else {
                    console.log("No Token or invalid token!");
                    vuexContext.dispatch('logout');
                    return;
                }
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            },
            isAuthenticated(state) {
                return state.token !== null;
            }
        }
    });
}

export default createStore;