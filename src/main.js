import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import "@wangeditor/editor/dist/css/style.css";

import {
  Button,
  message,
  Form,
  Divider,
  Avatar,
  Input,
  List,
  Icon,
  Pagination,
  Col,
  Tooltip,
  Row,
  Upload,
  Comment,
  Menu,
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Row);
Vue.use(Upload);
Vue.use(Comment);
Vue.use(Menu);
Vue.use(Col);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(Divider);
Vue.prototype.$message = message;
// Vue.use(Antd);

let serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3002/api/"
    : "/api/"; //Nginx 后端路径
axios.defaults.baseURL = serverUrl; //默认后端地址
Vue.prototype.$serverUrl = serverUrl; //同时将地址添加到原型链，方便获取

//全局请求拦截。
axios.interceptors.request.use(
  (config) => {
    let token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//全局响应拦截。
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
