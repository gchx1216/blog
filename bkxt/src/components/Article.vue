<template>
  <div>
    <el-form :inline="true"> 
        <el-form-item label="查询文章信息：" style="float: left">
            <el-input v-model="username" placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item style="float: right">
            <el-button type="primary" icon="el-icon-edit-outline" @click="handleAdd()">添加</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="serchUserinfo(username)" :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}"> 
        <el-table-column label="序号" type="index">
            <template></template>
        </el-table-column>
        <el-table-column label="文章名称">
            <template slot-scope="scope">
                <span>{{scope.row.aname}}</span>
            </template>
        </el-table-column>
        <el-table-column label="添加时间">
            <template slot-scope="scope">
                <span>{{scope.row.acreated_at | moment}}</span>
            </template>
        </el-table-column>
        <el-table-column label="更改时间">
            <template slot-scope="scope">
                <span>{{scope.row.aupdated_at | moment }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="haneleEdit(scope.$index,scope.row)" type="success" icon="el-icon-edit"></el-button>
                <el-button @click="haneleDelete(scope.$index,scope.row)" type="danger" icon="el-icon-delete-solid"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
    :current-page.sync="currentPage" :page-sizes="pageSizes" :page-size="pageSize" 
    layout="total,sizes,prev,pager,next,jumper" :total="userList.length">
    </el-pagination>
    <ArticleAdd :dialogAdd="dialogAdd" @update="getuser()"></ArticleAdd>
    <ArticleEdit :dialogEdit="dialogEdit" :form="form" @updateEdit="getuser"></ArticleEdit>
</div>
</template>

<script>
import ArticleAdd from './ArticleAdd'
import ArticleEdit from './ArticleEdit'
export default {
data(){
    return {
        currentPage:1,
        pageSizes:[5,10,15,20,25,30],
        pageSize: 5, 
        userList:[],
        tableData:[],
        username:'',
        dialogAdd:{
            show: false
        },
        dialogEdit:{
            show: false
        },
        form: {
            title:"",
            cid:""
        }
    }
},
methods:{
    getuser(){
        this.$axios.get('http://127.0.0.1:8888/article').then(res=>{
            this.userList = res.data;
            this.getPageData();
        })
    },
    getPageData(){
        let start = (this.currentPage -1)*this.pageSize;
        let end = start +this.pageSize;
        this.tableData = this.userList.slice(start,end)
    },
    serchUserinfo(username){
        return this.tableData.filter((user) => {
            if(user.aname.includes(username)) {
                return user
            }
        })
    },
    handleAdd(){
        this.dialogAdd.show = true
    },
    haneleEdit(index,row){
        this.dialogEdit.show = true
        this.form = {
            aid: row.aid,
            aname: row.aname,
            cid: row.cid,
            acreated_at:row.acreated_at
        }
    },
    haneleDelete(index,row){
        this.$confirm("确定要删除吗？","提示",{
                confirmButtonText:'确定',
                cancleButtonText:'取消',
                type:'warning',
            }).then(()=>{
                let params = {
                    aid:row.aid
                }
                this.$axios.delete('http://127.0.0.1:8888/article/del',{data:params}).then(res =>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    }) 
                    this.getuser()
                })
            }).catch(()=>{
                return
            })
    },
    handleSizeChange(val){
        this.pageSize = val;
        this.getPageData();
    },
    handleCurrentChange(val){
        this.currentPage = val
        this.getPageData();
    }
},
created(){
    this.getuser()
},
components:{
    ArticleAdd,
    ArticleEdit
}
}
</script>

<style>

</style>