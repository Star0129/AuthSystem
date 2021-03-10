<template>
  <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
    <el-form-item prop="email">
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
      <el-button type="primary" @click="submitData" style="width: 100%">下载</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'download',
  data () {
    let checkEmail = (rule, value,callback) =>{//验证邮箱
      const regEmail = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(this.ruleForm.email != '' && !regEmail.test(this.ruleForm.email)) {
        callback(new Error('请输入有效的邮箱'));
      }
    }
    return {
      flag:null,
      ruleForm: {
        email: '',
        code: ''
      },
      verify:{
        text:'获取验证码',
        loading:false,
        second:60,
      },
      rules: {
        email: [{required: true, message: '请输入授权时填写的邮箱!', trigger: 'blur'},{validator: checkEmail, trigger: 'blur'}],
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
