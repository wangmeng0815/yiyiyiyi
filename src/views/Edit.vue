<template>
  <div class="edit_box">
    <el-row style="text-align: center;">
      <el-col :span="18" :offset="3">
        <el-switch
          v-model="is_online"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="上线"
          inactive-text="下线">
        </el-switch>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="18" :offset="3">
        <el-input placeholder="请输入标题" v-model="formData.title" maxlength="30" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="18" :offset="3">
        <el-upload
          class="upload-demo"
          action="/api/file/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove" 
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>

    <el-row class="row" v-for="item in condition" :key="item.attr">
      <el-col :span="18" :offset="3">
        <el-select class="select" v-model="formData[item.attr]" :multiple="item.multi" :placeholder="item.title" clearable>
          <el-option
            v-for="it in item.data.slice(1)"
            :key="it.val"
            :label="it.key"
            :value="it.val">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="18" :offset="3">
        <el-input
          type="textarea"
          :autosize="{ minRows: 8}"
          placeholder="请输入内容"
          v-model="formData.content">
        </el-input>
      </el-col>
    </el-row>
    

    <el-row class="row" v-if="msg !== ''">
      <el-col :span="18" :offset="3">
        <div class="tip">{{ msg }}</div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="18" :offset="3">
        <el-button class="btn" @click="submit">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import Constant from '@/assets/js/constant.js';
import http from '@/assets/js/request.js';

export default {
  components: {
    HelloWorld
  },
  data() {
    let { condition } = Constant;
    return {
      condition,
      disabled: false,
      fileList: [],
      msg: '',
      is_online: true,
      formData: {
        id: '',
        title: '',
        coverImg: '',
        background: '',
        theme: '',
        level: 1,
        content:'',
        personCount: '',
        status: 0,
      }
    }
  },
  mounted() {
    let { id } = this.$route.query;
    if(id) {
      this.formData.id = id;
      this.getData();
    }
  },
  methods: {
    handleSuccess(res) {
      if(res.code === 0) {
        this.formData.coverImg = res.data;
        this.fileList.push({
          name: '封面',
          url: res.data
        });
      } else {
        console.log('文件上传失败');
      }
    },
    async getData() {
      let { id } = this.formData;
      try {
        let res = await http.get(`/article/detail?id=${id}`);
        if(res.code === 0) {
          this.formData.title = res.data.title;
          this.formData.background = res.data.background;
          this.formData.theme = res.data.theme;
          this.formData.level = res.data.level;
          this.formData.content = res.data.content;
          this.formData.personCount = res.data.personCount;
          this.is_online = res.data.status === 0 ? true : false;

        } else {
          console.log('获取详情接口报错');
        }
      } catch(e) {
        console.log(e);
      }
    },
    validate() {
      let { title, level, background, theme, coverImg, content } = this.formData;
      if(title === ''){
        return '请输入标题';
      }

      if(background === '') {
        return '背景未选择';
      }

      if(theme === ''){
        return '题材未选择';
      }

      if(coverImg === ''){
        return '图片未上传'
      }

      if(level === ''){
        return '难度不能为空';
      }

      if(content === '') {
        return '简介不能为空'
      }

      return '';
    },
    async submit() {
      this.msg = this.validate();
      if(this.msg !== ''){
        return;
      }

      let { formData, is_online } = this; 
      formData.status = is_online ? 0 : 1;
      try {
        let res;
        if(this.formData.id === ''){
          res = await http.post('/article', formData);
        } else {
          res = await http.put('/article', formData);
        }
        if(res.code === 0) {
          this.$router.push({
            path: '/'
          })
        } else {
          console.log('接口异常')
        }
      } catch(e) {
        console.log(e)
      }
    },
    handlePreview() {

    },
    handleRemove() {

    }
  }
}
</script>

<style lang="less" scoped>
.edit_box{
  background-color: #333;
  padding-top: 2rem;
  height: 100%;
  color: #fff;

  .row{
    margin-top: 1rem;

    .tip{
      color: red;
      font-weight: bolder;
      font-size: 1.4rem;
    }

    .select{
      width: 100%;
    }

    .btn{
      width: 100%;
    }
  }
}
</style>



