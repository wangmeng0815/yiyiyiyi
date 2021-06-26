<template>
  <div class="detail_box">
    <HelloWorld msg="欢迎来到 壹疑以议"/>

    <div>
      
    </div>

    <div class="detail_content">
      <div class="title">故事简介</div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import http from '@/assets/js/request.js';
export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      id: '',
      content: ''
    };
  },
  mounted() {
    let { id } = this.$route.query;
    this.id = id;
  },
  methods: {
    async query() {
      let { id } = this;
      try {
        let res = await http.get(`/detail?id=${id}`);
        if(res.code === 0) {
          this.content = res.data.content;
        } else {
          console.log('获取详情接口报错')
        }
      } catch(e){
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="less">
.detail_box{
  color: #fff;

  .detail_content {
    text-align: left;
    padding-left: 1rem;
    .title{
      font-size: 1.8rem;
    }

    .content{
      margin-top: 1rem;
    }

  }
}
</style>
