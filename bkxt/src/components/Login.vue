<template>
  <div class="hello">
      <h1>{{msg}}</h1>
      <el-form :inline="true" :model="form" ref="form" :rules="formrules">
          <el-form-item prop="user" >
              <el-input v-model="form.user" type="text" placeholder="请输入用户名...">
                  <el-button icon="el-icon-user-solid" slot="prepend"></el-button>
              </el-input>
          </el-form-item>
          <br>
          <el-form-item prop="pass" >
              <el-input v-model="form.pass" type="password" placeholder="请输入密码...">
                  <el-button icon="el-icon-unlock" slot="prepend"></el-button>
              </el-input>
          </el-form-item>
      </el-form>
      <div>
          <el-button @click="login('form')" icon="el-icon-user" type="success">登录</el-button>
      </div> 
  </div>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
    data(){
        return {
            msg: '欢迎登陆博客管理系统',
            form:{
                user: '',
                pass: '',
                sage: ''
            },
            formrules:{
                user:[{required:true,message:'请输入用户名',trigger:'blur'}],
                pass:[{required:true,message:'请输入密码',trigger:'blur'}],
            }
        }
    },
    methods:{
        ...mapMutations(['$_setStorage']),
        login(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    let params = {
                        username: this.form.user,
                        password: this.form.pass,
                    }
                    this.$axios.post("http://127.0.0.1:8888/admin/login",params).then(res=>{
                        if(res.data){
                            localStorage.setItem('name',res.data.data[0].a_name)
                            localStorage.setItem('id',res.data.data[0].a_id)
                            localStorage.setItem('last',res.data.data[0].last_login_at)
                            this.$_setStorage({Authorization:res.data.token})
                            this.$router.push({
                                path: '/index'
                            })
                            this.$message({
                                type:'success',
                                message:'登录成功'
                            })
                        } else {
                            this.$message({
                                type:'danger',
                                message:'请输入正确的信息'
                            })
                        }   
                    })
                }  
            })
            this.form.user = ''
            this.form.pass = ''
        },
    }
}
</script>

<style>
    .hello {
        margin: auto;
        width: 1200px;
        height: auto;
        text-align: center;
    }
    h1 {
        margin: 60px 0;
    }
    .el-input {
        width: 250px;
    }
</style>