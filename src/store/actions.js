import axios from 'axios/dist/axios'
import server from '../env.dev'

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

    AUTH_LOGOUT: ({ commit, getters }) => {
        return new Promise((resolve, reject) => {
            let string = server + 'logout';
            axios.get(string, {
                headers: {
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

    SEARCH_CODE: ({ commit, getters }, params) => {
        return new Promise((resolve, reject) => {
            let string = `${server}package-code/${params}`;

            axios.get(string, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            }).then((resp) => {
                console.log(resp.data);
                commit('SET_PACKAGE', resp.data);
                resolve(resp.data);
            }).catch(err => {
                reject(err)
                console.log(err);
            });
        });
    },

    SEND_PACKAGE: ({ commit, getters }, param) => {
        return new Promise((resolve, reject) => {
            let string = `${server}package-code/${params}`;

            axios.get(string, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            }).then((resp) => {
                console.log(resp.data);
                commit('SET_PACKAGE', resp.data);
                resolve(resp.data);
            }).catch(err => {
                reject(err)
                console.log(err);
            });
        });
    },

    SEARCH_BAG_CODE: ({ commit, getters }, params) => {
        return new Promise((resolve, reject) => {
            let string = `${server}bolsas/${params}`;

            axios.get(string, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            }).then((resp) => {
                commit('SET_BAG', resp.data);
                resolve(resp.data);
            }).catch(err => {
                reject(err)
                console.log(err);
            });
        });
    },

    CREATE_CLIENTS: ({ commit, getters }, params) => {
        return new Promise((resolve, reject) => {
            let string = `${server}clientes`;
            axios.post(string, { params }, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            }).then(res => {
                console.log(resp.data);
                resolve(res.data)
            }).catch(err => {
                reject(err)
                console.log(err);
            });
        });
    },

    async ['FETCH_TYPES']({ commit, getters }) {
        try {
            let string = `${server}tipos`;
            const { data } = await axios.get(string, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            });
            console.log(data)
            commit('SET_TIPOS', data.data);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    // Busqueda
    async ['FETCH_STYPES']({ commit, getters }, params) {
        try {
            let string = `${server}tipos?string=${params}`;
            const { data } = await axios.get(string, {
                headers: {
                    Authorization: getters.getAccessToken
                }
            });
            commit('SET_TIPOS', data.data);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
}