<template>
  <div>
      <el-dialog title="添加用户信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formadd" :rules="formrules">
          <el-form-item label="用户名" prop="username"> 
              <el-input v-model="formDate.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password"> 
              <el-input v-model="formDate.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="a_name"> 
              <el-input v-model="formDate.a_name"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="role"> 
              <el-input v-model="formDate.role"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formadd')">确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
 name: 'AdminAdd',
    props: {
        dialogAdd: Object
    },
    data(){
        return {
            formDate:{
                username:'',
                password:'',
                a_name:'',
                role:''
            },
            formrules:{
                username:[{required:true,message:'姓名不能为空',trigger:'blur'}],
                password:[{required:true,message:'姓名不能为空',trigger:'blur'}],
            }
        }
    },
    methods:{
        dialogFormAdd(formadd){
            this.$refs[formadd].validate((valid)=>{
                if(valid){
                    this.$axios.post('http://127.0.0.1:8888/admin/insert',this.formDate).then(res =>{
                        this.$message({
                            type:'success',
                            message:'添加用户成功'
                        })
                        this.dialogAdd.show = false;
                        this.$emit('update');
                    })
                    this.formDate = ""
                } else{
                    console.log("error")
                    return false;
                }
            })
        }
    },
}

</script>

<style>

</style>