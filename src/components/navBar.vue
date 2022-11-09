<template>
  <div>
    <a-menu v-model="current" mode="horizontal" @click="navTo">
      <a-menu-item key="demo"> <a-icon type="appstore" />首页</a-menu-item>
      <a-menu-item key="articleCreate"
        ><a-icon type="edit" />写文章</a-menu-item
      >
      <a-menu-item key="articleLists"
        ><a-icon type="edit" />文章列表</a-menu-item
      >
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="setting" />
          用户
        </span>
        <a-menu-item-group title="用户设置">
          <a-menu-item key="userinfo">修改个人信息</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="登录状态">
          <a-menu-item key="signup">注册</a-menu-item>
          <a-menu-item key="login">登录</a-menu-item>
          <a-menu-item key="logout">注销</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ["main"],
    };
  },
  methods: {
    navTo(menu) {
      let key = menu.key;
      if (key === "logout") {
        console.log(123);
      } else {
        this.$router.push({ name: key });
      }
    },
  },
};
</script>
