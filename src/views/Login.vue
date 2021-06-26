<template>
  <div class="login_box">
    <HelloWorld msg="欢迎来到 壹疑以议"/>
    <h1 style="color: #fff;">请联系管理员，申请账号</h1>
    <el-row class="item" >
      <el-col :span="18" :offset="3">
        <el-input placeholder="请输入账号" v-model="userName" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="item" >
      <el-col :span="18" :offset="3">
        <el-input placeholder="请输入账号" v-model="passWord" clearable show-password></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18" :offset="3">
        <el-button @click="login">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import request from '@/assets/js/request.js';

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      userName: '',
      passWord: ''
    }
  },
  methods:{
    async login(){
      let { userName, passWord } = this;

      if(!this.validate()){
        return;
      }

      try {
        let res = await request.post('/user/login', {
          passWord,
          userName
        });

        if(res.code === 0) {
          // TODO cookie
          this.$router.push('/');
        }
      } catch(e) {
        console.log(e);
      }
    },
    validate() {
      let { userName, passWord } = this;

      if(userName === '' || passWord === ''){
        return false;
      }

      return true;
    }
  }
}
</script>

<style lang="less" scoped>
.login_box{
  text-align: center;
  .el-row{
    margin-top: 6rem;
  }
  .item{

  }
}
</style>

