<template>
  <div class="more-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>test1</el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>test2</el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>test3</el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'More',
    components: {},
    data() {
      return {
        test: 1,
      }
    },
    created() {},
    mounted() {},
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .more-container {
    ::v-deep {
      .el-card__body {
        > div {
          min-height: 220px;
          padding: 20px;

          > ul {
            > li {
              line-height: 30px;
            }
          }

          > img {
            display: block;
            margin: 40px auto;
            border: 1px solid #dedede;
          }
        }
      }
    }
  }
</style>
