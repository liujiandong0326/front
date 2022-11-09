<template>
  <div>
    <a-list
      v-if="comments.length"
      :dataSource="comments"
      :pagination="pagination"
      :header="`共 ${comments.length} 个回复`"
      itemLayout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment
          :author="item.username"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.createdAt"
        ></a-comment>
      </a-list-item>
    </a-list>
    <a-comment>
      <a-avatar slot="avatar" :src="$store.state.avatar" alt="user" />
      <div slot="content">
        <a-form-item>
          <a-textarea
            :rows="4"
            @change="handleChange"
            :value="value"
          ></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit"
            type="primary"
            >提交评论</a-button
          >
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      submitting: false,
      value: "",
      pagination: {
        pageSize: 10,
        position: "both",
      },
    };
  },
  created() {
    this.getComments();
  },
  props: {
    aid: {
      type: String,
      default: "",
    },
  },
  methods: {
    getComments() {
      this.$axios
        .get("/comments/articles/" + this.aid)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.comments = res.data.body;
          }
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;
      let obj = {
        username: this.$store.state.username,
        userid: this.$store.state.userid,
        content: this.value,
        avatar: this.$store.state.avatar,
      };

      this.$axios
        .post("/comments/" + this.aid, obj)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.submitting = false;
            this.comments.push(obj);
            this.value = "";
          }
        })
        .catch(() => {
          this.submitting = false;
          this.$message.error("评论失败");
        });
    },
    handleChange(e) {
      this.value = e.target.value;
    },
  },
};
</script>
