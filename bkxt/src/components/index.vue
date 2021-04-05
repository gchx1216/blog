<template>
<div class="index">
  <el-container>
    <!-- 头部 -->
    <el-header>
      <h3 style="float: left">博客后台管理系统</h3>
      <span style="float: right">{{name}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
         <el-button size="small" @click="out">退出登录</el-button></span>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside style="width: 200px;" >
        <ul>
          <li><el-button  icon="el-icon-s-home" type="text" @click="addI">主界面</el-button></li>
          <li><el-button  icon="el-icon-s-custom" type="text" @click="addP">管理人员</el-button></li>
          <li><el-button  icon="el-icon-s-unfold" type="text" @click="addC">分类列表</el-button></li>
          <li><el-button  icon="el-icon-tickets" type="text"  @click="addA">文章列表</el-button></li>
        </ul>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabsItem"
                       :key="item.name"
                       :label="item.title"
                       :name="item.name"
                       :closable="item.closable"
                       :ref="item.ref">
            <component :is="item.content"></component>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
  
</div>
  
</template>

<script>
import welcome from './welcome'
import Admin from './Admin'
import Cate from './Cate'
import Article from './Article'

export default {
  data () {
    return {
      name: localStorage.getItem('name'),
      activeTab:'1',
      tabsItem: [{
          title: '主界面',
          name: '1',
          content: welcome
        }],
      tabsPath: [{
        name: '1',
        path:'/welcome'
      }

      ],
      tabIndex: 1
    }
  },
  methods:{
    out () {
      localStorage.clear()
      this.$router.push('/')
    },
    //删除Tab
    removeTab(targetName) { 
      let tabs = this.tabsItem; //当前显示的tab数组
      let activeName = this.activeTab; //点前活跃的tab
      //如果当前tab正活跃 被删除时执行
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.activeTab = activeName;
      this.tabsItem = tabs.filter(tab => tab.name !== targetName);
      //在tabsPath中删除当前被删除tab的path
      this.tabsPath = this.tabsPath.filter(item => item.name !== targetName)
    },
    addP() {
      let newTabName = ++this.tabIndex + '';
        this.tabsItem.push({
          title: '管理人员',
          name: newTabName,
          content: Admin
        });
        this.tabsPath.push({
          name: newTabName,
          path: '/Admin'
        })
      this.activeTab = newTabName;
    },
    addC(){
      let newTabName = ++this.tabIndex + '';
        this.tabsItem.push({
          title: '分类列表',
          name: newTabName,
          content: Cate
        });
        this.tabsPath.push({
          name: newTabName,
          path: '/Cate'
        })
      this.activeTab = newTabName;
    },
    addA(){
      let newTabName = ++this.tabIndex + '';
        this.tabsItem.push({
          title: '文章列表',
          name: newTabName,
          content: Article
        });
        this.tabsPath.push({
          name: newTabName,
          path: '/Article'
        })
      this.activeTab = newTabName;
    },
    addI(){
      let newTabName = ++this.tabIndex + '';
        this.tabsItem.push({
          title: '主界面',
          name: newTabName,
          content: welcome
        });
        this.tabsPath.push({
          name: newTabName,
          path: '/welcome'
        })
      this.activeTab = newTabName;
    }
  },
  components:{
    Admin,
    Cate,
    Article,
    welcome
  }
}
</script>

<style>
  ul li {
    list-style: none;
  }
  .index{
    margin: auto;
    height: auto;
  }
  .el-header {
    padding: 0 60px;
    width: 100Vw;
    height: 50px;
    line-height: 50px;
    background-color: #ddd
  }
  .el-aside {

    height: 500px;
    background-color: #eee;
  }
  .el-aside li {
    margin-top: 40px;
    text-align: center;

  }
</style>