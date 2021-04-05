<template>
  <div class="hello">
      <el-dialog title="编辑用户信息" :visible.sync="dialogEdit.show">
        <el-form :model="form" ref="formEdit" :rules="formrules">
            <el-form-item label="分类名称" prop="title"> 
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEdit.show = false">取消</el-button>
            <el-button type="primary" @click="dialogFormEdit('formEdit')">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    // 初始值
    props: {
        dialogEdit: Object,
        form: Object
    },
    data(){
        return {
            formrules:{
                title:[{required:true,message:'分类名称不能为空',trigger:'blur'}],
            }
        }
    },
    methods:{
        dialogFormEdit(formEdit){
            this.$refs[formEdit].validate((valid)=>{
                if(valid){
                    let data = {
                        id: this.form.id,
                        title: this.form.title,
                        c_created_at: this.form.c_created_at
                    }
                    this.$axios.put('http://localhost:8888/update',data).then((res) =>{
                        this.$message({
                            type:'success',
                            message:'修改分类成功'
                        })
                        this.dialogEdit.show = false;
                        this.$emit('updateEdit');
                    })
                    
                } else{
                    console.log("error")
                    return false;
                }
            })
        }
    }
}
</script>

<style>

</style>