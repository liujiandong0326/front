import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userid: "",
    username: "",
    avatar: "",
  },
  mutations: {
    login_saveToken(state, token) {
      function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = decodeURIComponent(
          atob(base64Url)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(base64);
      }
      let userinfo = parseJwt(token);
      state.userid = userinfo.userid;
      state.username = userinfo.username;
      state.token = token;
      window.localStorage.setItem("token", state.token);
    },

    logout_delToken(state) {
      window.localStorage.removeItem("token");
      state.token = "";
      state.userid = "";
      state.username = "";
    },

    saveAvatar(state, url) {
      state.avatar = url;
    },
  },
  actions: {
    getAvatar({ commit, state }) {
      axios.get("/users/info/" + state.username).then((res) => {
        commit("saveAvatar", res.data.data.avatar);
      });
    },
  },
  modules: {},
});
