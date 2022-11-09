<template>
  <div class="main">
    <h2>文章列表</h2>
    <div v-for="item in listsPaged" :key="item.id" class="article-lists">
      <div class="title" @click="$router.push('/articles/' + item._id)">
        {{ item.title }}
      </div>
      <div>作者：{{ item.username }}，发表时间：{{ item.createdAt }}</div>
      <a-divider />
    </div>
    <a-pagination :total="lists.length" v-model="currentPage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
      currentPage: 1,
    };
  },
  computed: {
    listsPaged() {
      let pageSize = 10;
      return this.lists.slice(
        (this.currentPage - 1) * pageSize,
        (this.currentPage - 1) * pageSize + 10
      );
    },
  },
  methods: {
    getLists() {
      this.$axios
        .get("/articles")
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.data.msg);
            this.lists = res.data.body;
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

<style scoped>
.main {
  text-align: left;
  margin: 20px;
}

.article-lists .title {
  font-size: 1.4em;
  margin: 5px 0;
  font: bolder;
  display: inline-block;
  padding: 5px;
  border-radius: 4px;
}
.article-lists .title:hover {
  cursor: pointer;
  color: #1890ff;
  background-color: rgb(250, 250, 250);
}
</style>
