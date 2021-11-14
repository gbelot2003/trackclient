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
        state.code = payload
    }
}