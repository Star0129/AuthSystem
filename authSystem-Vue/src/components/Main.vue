<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/query' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/auth' }">授权修改</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/download' }">文件下载</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/query' }">后台</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text item">
      <router-view/>
    </div>
  </el-card>
</template>

<script>
</script>

<style scoped>
.box-card {
  width: 40%;
  height: 100%;
  margin: 5% auto 0px;
  padding: 0px;
}
@media (max-width: 768px){
  .box-card {
    width: 90%;
    height: 100%;
    margin: 5% auto 0px;
    padding: 0px;
}
}
</style>
