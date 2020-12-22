<template>
  <div class="mdEditor">
    <div class="back-to-top-container">
      <div class="body">
        <div class="editor">
          <div class="blogInfo">
            <el-form
              ref="ruleForm"
              :model="blogInfo"
              :rules="rules"
              label-position="left"
              label-width="50px"
            >
              <el-form-item label="标题" prop="title">
                <el-input v-model="blogInfo.title" maxlength="50"></el-input>
              </el-form-item>

              <el-form-item label="标签" prop="label">
                <el-select v-model="blogInfo.label" multiple>
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.labelName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="content">
                <Markdown
                  v-model="blogInfo.content"
                  :height="900"
                  :bordered="false"
                  @on-save="handleOnSave"
                />
              </el-form-item>

              <el-form-item>
                <el-input
                  v-model="blogInfo.abstract"
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  maxlength="200"
                  placeholder="文章简要描述"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>

          <el-checkbox
            v-model="blogInfo.public"
            style="position: absolute; right: 0px"
          >
            公开发布
          </el-checkbox>

          <el-button type="primary" @click="release('ruleForm')">
            发布
          </el-button>
          <el-button @click="saveDraft">保存草稿</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Markdown from 'vue-meditor'
  import { addBlog, labelList } from '@/api/blog'

  export default {
    name: 'MarkDownEditor',
    components: {
      Markdown,
    },
    data() {
      return {
        view: true,
        blogInfo: {
          public: true,
          title: '',
          label: '',
          abstract: '',
          content: '## MarkDown Editor',
          author: 'botoo',
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            {
              min: 2,
              max: 100,
              message: '长度在 2 到 100 个字符',
              trigger: 'blur',
            },
          ],
          content: [
            {
              required: true,
              message: '你不写内容你发布个锤子？？',
              trigger: 'blur',
            },
          ],
          label: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        },
        status: 0,
        options: [
          {
            id: '1',
            labelName: 'Python',
          },
        ],
      }
    },
    created() {
      this.getLabelList()
    },
    methods: {
      release(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const save_data = {}
            save_data['blogInfo'] = this.blogInfo
            save_data['status'] = 1

            addBlog(save_data).then((res) => {
              if (res.data === false) {
                this.$message.error(
                  '啊哦,服务器内部错误,没有保存成功,先本地保存下吧'
                )
              } else {
                this.$message.success('保存成功啦')
                this.resetForm('ruleForm')
              }
            })
          } else {
            this.$message.error('错了哦，仔细看看哪里没写')
          }
        })
      },
      saveDraft() {},
      releaseForMe() {},
      getLabelList() {
        labelList().then((res) => {
          this.options = res.data
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleOnSave() {
        console.log(this.content)
      },
    },
  }
</script>

<style scoped>
  .mdEditor {
    width: 100%;
    padding: 10px;
    height: 100%;
  }

  .body {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .editor {
    margin-right: 20px;
    height: 100%;
    width: 50%;
    flex-grow: 1;
    position: relative;
  }
</style>
