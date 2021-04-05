<template>
  <div>
    <el-dialog title="添加分类信息" :visible.sync="dialogAdd.show">
        <el-form :model="formDate" ref="formadd" :rules="formrules">
            <el-form-item label="分类名称" prop="title"> 
                <el-input v-model="formDate.title"></el-input>
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
                title:'',
            },
            formrules:{
                title:[{required:true,message:'分类名称不能为空',trigger:'blur'}],
            }
        }
    },
    methods:{
        dialogFormAdd(formadd){
            this.$refs[formadd].validate((valid)=>{
                if(valid){
                    this.$axios.post('http://127.0.0.1:8888/insert',this.formDate).then(res =>{
                        this.$message({
                            type:'success',
                            message:'添加分类成功'
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