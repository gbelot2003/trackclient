export default {
    LOGIN_SUCCESS(state, payload) {
        state.isLoggedIn = true;
        state.access_token = payload.access_token;
        state.isLoggedIn = true;
        state.expires_at = payload.expires_at;
    },

    LOGOUT(state) {
        state.isLoggedIn = false;
        state.access_token = '';
        state.expires_at = '';
        state.zone = '';
    },

    CHANGE_MENU_STATE(state, payload) {
        state.manuPage = payload;
    },

    SET_USER(state, payload) {
        state.user = payload;
    },

    SET_CODE(state, payload) {
        state.code = payload;
    },

    UNSET_CODE(state) {
        state.code = "";
    },

    SET_COODENATES(state, payload) {
        state.coordenates.latitude = payload.latitude
        state.coordenates.longitude = payload.latitude
    },

    UNSET_COORDENATES(state) {
        state.coordenates = {
            latitude: '',
            latitude: ''
        }
    },

    SET_PACKAGE(state, payload) {
        state.package = payload;
    },

    UNSET_PACKAGE(state){
        state.package = {}
    },

    SET_REMITENTE(state, payload) {
        state.remitente = payload;
    },

    UNSET_REMITENTE(state) {
        state.remitente = {};
    },

    SET_DESTINATARIO(state, payload) {
        state.destinatario = payload;
    },

    UNSET_DESTINATARIO(state) {
        state.destinatario = {}
    },

    SET_TIPO(state, payload) {
        state.tipo = payload;
    },

    UNSET_TIPO(state) {
        state.tipo = {}
    },

    SET_AGENCIA(state, payload) {
        state.agencia = payload;
    },

    UNSET_AGENCIA(state) {
        state.agencia = {}
    },

    SET_SECCION(state, payload) {
        state.seccion = payload
    },

    UNSET_SECCION(state) {
        state.seccion = {}
    },

    SET_IMAGE(state, payload) {
        state.image = payload
    }
}