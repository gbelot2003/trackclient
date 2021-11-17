export default {
    getIsLogedIn(state) {
        return state.isLoggedIn;
    },

    getToken(state) {
        return state.access_token;
    },
    
    getAccessToken(state) {
        return state.token_type + ' ' + state.access_token;
    },
    
    getExpires(state) {
        return state.expires_at;
    },
    
    getUser(state) {
        return state.user;
    },

    getCode(state) {
        return state.code;
    },

    getPackage(state) {
        return state.package
    },

    getRemitente(state) {
        return state.remitente
    },

    getDestinatario(state) {
        return state.destinatario
    },

    getTipo(state) {
        return state.tipo
    },

    getAgencia(state) {
        return state.agencia
    }
}