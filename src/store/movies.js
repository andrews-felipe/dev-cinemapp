import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    currentMovie: {},
    stateRequest: false,
    view: true, // listagem - favoritos
  },
  mutations: {
    SET_MOVIES(state, list) {
      state.movies = list;
    },
    SET_CURRENT_MOVIE(state, user) {
      state.currentUser = user;
    },
    SET_STATE_REQUEST(state, stateRequest) {
      state.stateRequest = stateRequest;
    },
    SET_VIEW(state, statusView) {
      state.view = statusView;
    },
  },
});
