<template>
  <div class="main">
    <h2>修改个人信息</h2>

    <a-row v-if="avatar" type="flex" justify="center">
      <a-tooltip>
        <template slot="title">清除头像</template>
        <img
          :src="avatar"
          alt="avatar"
          class="info-avatar"
          @click="avatar = ''"
        />
      </a-tooltip>
    </a-row>
    <a-row v-else type="flex" justify="center">
      <upload @uploadedPic="finishUpload" />
    </a-row>
    <a-row>
      <a-col :span="2" :offset="10">修改密码：</a-col>
      <a-col :span="3">
        <a-input type="password" v-model="password1" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="2" :offset="10">重复密码：</a-col>
      <a-col :span="3">
        <a-input type="password" v-model="password2" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="2" :offset="10">修改昵称：</a-col>
      <a-col :span="3">
        <a-input type="text" v-model="nickname" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="sumitChange">确定提交</a-button>
    </a-row>
  </div>
</template>

<script>
import upload from "../components/upload";
export default {
  components: {
    upload,
  },
  data() {
    return {
      password1: "",
      password2: "",
      nickname: "",
      avatar: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get("/users/info/" + this.$store.state.username)
        .then((res) => {
          console.log(res.data.data);
          let body = res.data.data;
          this.nickname = body.nickname;
          this.avatar = body.avatar;
        });
    },
    sumitChange() {
      if (this.password1 !== this.password2) {
        this.$message.error("两次密码不一致");
        return;
      }
      let obj = {
        username: this.$store.state.username,
        nickname: this.nickname,
        avatar: this.avatar,
        password: this.password1,
      };
      this.$axios.post("/users/update/", obj).then((res) => {
        console.log(res.data);
        this.$message.success(res.data.msg);
      });
    },
    finishUpload(imgUrl) {
      this.avatar = imgUrl;
    },
  },
};
</script>

<style>
img.info-avatar {
  width: 128px;
  height: 128px;
  object-fit: contain;
  cursor: pointer;
}
</style>
