<template>
  <div class="article-create">
    <h2>{{ editMode ? "编辑文章" : "新增文章" }}</h2>
    <div><a-input v-model="title" size="large" placeholder="输入标题" /></div>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
    <a-button v-on:click="submitContent">发表</a-button>
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: "articleCreate",
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      editorContent: "",
      title: "",
    };
  },
  props: {
    aid: {
      type: String,
      default: "",
    },
  },
  computed: {
    editMode() {
      return this.aid !== "";
    },
  },
  mounted() {
    if (this.editMode) {
      this.$axios
        .get("/articles/" + this.aid)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.title = res.data.body.title;
            this.html = res.data.body.content;
          }
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    submitContent() {
      let obj = {
        username: this.$store.state.username,
        userid: this.$store.state.userid,
        title: this.title,
        content: this.html,
      };
      if (this.editMode) {
        this.$axios
          .put("/articles/" + this.aid, obj)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
            }
          })
          .catch(() => {
            this.$message.error("修改失败");
          });
      } else {
        this.$axios
          .post("/articles", obj)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
            }
          })
          .catch(() => {
            this.$message.error("发表失败");
          });
      }
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style scoped>
.article-create {
  text-align: left;
  margin: 20px;
}
.editor {
  margin: 20px 0;
}
</style>
