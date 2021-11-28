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

    getCoordenates(state) {
        return state.coordenates;
    },

    getCode(state) {
        return state.code;
    },

    getPackage(state) {
        return state.package
    },

    getBag(state) {
        return state.bag
    },

    getRemitente(state) {
        return state.remitente
    },

    getRemitenteBag(state) {
        return state.remitenteBag
    },

    getDestinatario(state) {
        return state.destinatario
    },

    getDestinatarioBag(state) {
        return state.destinatarioBag
    },

    getTipos(state) {
        return state.tipos
    },

    getTipo(state) {
        return state.tipo
    },

    getAgencia(state) {
        return state.agencia
    },

    getSeccion(state) {
        return state.seccion
    },

    getImage(state) {
        return state.image
    },

    getTransito(state) {
        return state.transito
    },

}