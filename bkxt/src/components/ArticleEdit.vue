<template>
  <div class="hello">
      <el-dialog title="编辑文章信息" :visible.sync="dialogEdit.show">
        <el-form :model="form" ref="formEdit" :rules="formrules">
            <el-form-item label="文章名" prop="aname"> 
                <el-input v-model="form.aname"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="cid"> 
                <el-input v-model="form.cid" type="number"></el-input>
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
                aname:[{required:true,message:'文章名不能为空',trigger:'blur'}],
            }
        }
    },
    methods:{
        dialogFormEdit(formEdit){
            this.$refs[formEdit].validate((valid)=>{
                if(valid){
                    let data ={
                        aid:this.form.aid,
                        cid: this.form.cid,
                        aname: this.form.aname,
                        acreated_at: this.form.acreated_at
                    }
                    this.$axios.put('http://127.0.0.1:8888/article/update',data).then((res) =>{
                        this.$message({
                            type:'success',
                            message:'修改文章成功'
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