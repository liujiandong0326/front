<template>
  <div class="main">
    <a-button @click="deleteArticle" v-if="allowed">删除</a-button>
    <a-button @click="editArticle" v-if="allowed">修改</a-button>
    <h2>{{ title }}</h2>
    <div v-html="content"></div>
    <comments :aid="id" />
  </div>
</template>

<script>
import Comments from "@/views/comments";

export default {
  components: { Comments },
  computed: {
    allowed() {
      return (
        this.$store.state.username == this.username ||
        this.$store.state.role == "admin"
      );
    },
  },
  data() {
    return {
      title: "",
      content: "",
      username: "",
      nickname: "",
    };
  },
  props: {
    id: String,
  },
  methods: {
    editArticle() {
      this.$router.push("/articleEdit/" + this.id);
    },
    deleteArticle() {
      this.$axios
        .delete("/articles/" + this.id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("文章已删除");
            this.$router.back();
          }
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    getLists() {
      this.$axios
        .get("/articles/" + this.id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.title = res.data.body.title;
            this.content = res.data.body.content;
            this.username = res.data.body.username;
            this.nickname = res.data.body.nickname;
          }
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
  },

  created() {
    this.getLists();
  },
};
</script>
