import axios from 'axios/dist/axios'
import server from './env.dev'

export default {
    AUTH_REQUEST: ({ commit }, params) => {
        return new Promise((resolve, reject) => {
            const string = server + 'login';
            axios.post(string, params)
            .then(resp => {
                commit('LOGIN_SUCCESS', resp.data);
                resolve(resp.data);
            }).catch(err => {
            reject(err);
            })
        })
    },

    GET_USER: async ({ commit, getters }) => {
        let string = server + 'user';
        try {
            axios.get(string, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            }).then(resp => {
                commit('SET_USER', resp.data)
            })
        } catch (e) {
            console.log(e)
        }
    },

    AUTH_LOGOUT:({commit, getters}) => {
        return new Promise((resolve, reject) => {
            let string = server + 'logout';
            axios.get(string, {
                headers:{
                    Authorization: getters.getAccessToken
                }
            })
                .then((resp) => {
                    commit('LOGOUT');
                    resolve(resp);
                }).catch(err => {
                reject(err);
            })
        })
    },

    CHANGE_CODE:({ commit }, params) => {
        console.log(params);
        commit('SET_CODE', params);
    },

    SEARCH_CODE:({ commit, getters}, params) => {
        return new Promise((resolve, reject) => {
            let string = `${server}package-code/${params}`;
            console.log(string);
            axios.get(string).then((resp) => {
                commit('SET_PACKAGE', resp.data);
                resolve(resp.data);
            }).catch(err => {
                reject(err)
                console.log(err);
            });
        });
    },
}