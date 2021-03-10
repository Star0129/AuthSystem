<template>
  <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
    <el-form-item prop="oldDomainName">
      <el-input v-model="ruleForm.oldDomainName" placeholder="请输入授权时所填写的域名！"></el-input>
    </el-form-item>
    <el-form-item prop="newDomainName">
      <el-input v-model="ruleForm.newDomainName" placeholder="请输入您需要更换的新域名！"></el-input>
    </el-form-item>
    <el-form-item prop="email" ref="email">
      <el-input v-model="ruleForm.email" placeholder="请输入授权时填写的邮箱！"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input v-model="ruleForm.code" placeholder="邮箱验证码"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :loading="verify.loading" @click="getCode">{{verify.text}}</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitData" style="width: 100%">更换</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'auth',
  data () {
    let checkDomainName = (rule, value,callback) =>{//验证域名
      const regEmail = /^([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?)$/;
      if(!regEmail.test(this.ruleForm[rule.field])) {
        callback(new Error('请输入有效的域名！'));
      }
    }
    return {
      flag:null,
      ruleForm: {
        oldDomainName: '',
        newDomainName: '',
        email: '',
        code: ''
      },
      verify:{
        text:'获取验证码',
        loading:false,
        second:60,
      },
      rules: {
        oldDomainName: [{ required: true, message: '请输入授权时所填写的域名!', trigger: 'blur' },{validator: checkDomainName, trigger: 'change'}],
        newDomainName: [{ required: true, message: '请输入您需要更换的新域名!', trigger: 'blur' },{validator: checkDomainName, trigger: 'change'}],
        email: [{required: true, message: '请输入授权时填写的邮箱!', trigger: 'blur'}, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitData: function () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$message.error("所填写项有缺失");
        }
      })
    },
    getCode: function (){
      this.$refs['ruleForm'].validateField('email', (error) => {
        if(!error){
          this.verify.loading=true
          this.$message.success("验证码发送成功")
          this.verify.text=this.verify.second+"s重新获取"
          this.flag= setInterval(this.race,1000);
        }
      })
    },
    race: function (){
      this.verify.second=this.verify.second-1
      this.verify.text=this.verify.second+"s重新获取"
      if(this.verify.second<=0) {
        clearTimeout(this.flag)
        this.verify.loading = false
        this.verify.second=60
        this.verify.text = "获取验证码"
      }
    }
  }
}
</script>

<style scoped>

</style>>
