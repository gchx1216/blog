<template>
  <div>
      <el-dialog title="添加文章信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formadd" :rules="formrules">
          <el-form-item label="文章名" prop="aname"> 
              <el-input v-model="formDate.aname"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="cid"> 
              <el-input v-model="formDate.cid" type="number"></el-input>
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
                aname:'',
                cid:'',
            },
            formrules:{
                aname:[{required:true,message:'文章名不能为空',trigger:'blur'}],
            }
        }
    },
    methods:{
        dialogFormAdd(formadd){
            this.$refs[formadd].validate((valid)=>{
                if(valid){
                    this.$axios.post('http://127.0.0.1:8888/article/insert',this.formDate).then(res =>{
                        this.$message({
                            type:'success',
                            message:'添加文章成功'
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