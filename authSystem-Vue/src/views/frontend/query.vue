<template>
  <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
    <el-form-item prop="domainName">
      <el-input v-model="ruleForm.domainName" auto-complete="off" placeholder="请输入授权时填写的域名！"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="clickButton" style="width: 100%">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "query",
  data() {
    let checkDomainName = (rule, value,callback) =>{//验证域名
      const regEmail = /^([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?)$/;
      if(!regEmail.test(this.ruleForm[rule.field])) {
        callback(new Error('请输入有效的域名！'));
      }
    }
    return {
      ruleForm: {
        domainName: "",
      },
      rules: {
        domainName: [{ required: true, message: "请输入授权时填写的域名!", trigger: "blur" },{validator: checkDomainName, trigger: 'change'}],
      },
    };
  },
  methods: {
    clickButton: function () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
            this.$message.error("所填写项有缺失");
        }
      })
      
    },
  },
};
</script>

<style scoped>

</style>>
