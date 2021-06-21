<template>
  <div class="list_box">
    <div class="condition">
      <div class="condition_item" v-for="(item, index) in conditionData" :key="index">
        <div class="con_title">
          {{ item.title }}
        </div>
        <div class="con_content">
          <div class="cond_cont">
            <div class="cond_cont_item" :class="{'selected': it.active}" v-for="(it, i) in item.data" :key="i" @click="select(item, it)">
              {{ it.key }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list" >
      <div class="item" v-for="item in listData" :key="item.id" @click="goto(item)">
        <div class="img">
          <img :src="item.img" alt="img">
        </div>
        <div class="content">
          <div class="title">{{ item.title }}</div>
          <div class="tag_div">
            <div class="tag">{{ item.count }}人</div>
            <div class="tag" v-for="it in item.type" :key="it" >{{ it | typeFilter }}</div>
            <div class="tag">{{ item.level | levelFilter }}</div>
          </div>
          <div class="intro">{{ item.introduction }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Constant from '@/assets/js/constant.js';

const typeMap = {
  0: '现实',
  1: '武侠',
  2: '玄幻',
};
const levelMap = {
  0: '简单',
  1: '中等',
  2: '困难',
};
export default {
  data() {
    return {
      listData: [{
        id: 1,
      }, {
        id: 2,
      }],
      conditionData: Constant.condition,
      queryForm: {
        count: '',
        duration: '',
        type: '',
        level: '',
        order: '',
      },
    };
  },
  filters: {
    typeFilter: (_input) => typeMap[_input],
    levelFilter: (_input) => levelMap[_input],
  },
  mounted() {
    this.query();
  },
  watch: {
    queryForm: {
      handler(newVal, oldVal) {
        this.query();
      },
      deep: true,
    },
  },
  methods: {
    async query() {
      console.log('发送请求');
      let res = await axios.get('/json/note.json');
      res = res.data;
      if (res.code === 0) {
        this.listData = res.data.list;
      } else {
        console.log('error');
      }
    },
    goto(_item) {
      this.$router.push({
        path: `/detail?id=${_item.id}`,
      });
    },
    select(_item, _it) {
      const { attr } = _item;
      _item.data.forEach((it) => {
        it.active = false;
      });
      _it.active = true;
      this.queryForm[attr] = _it.val;
      // console.log(this.queryForm)
    },
  },
};
</script>

<style scoped lang="less">
.list_box{

  .condition {

    .condition_item {
      display: flex;
      padding: 0 1rem;
      align-items: center;
      margin-bottom: 1rem;

      .con_title {
        color: #8e8f90;
        font-size: 1.4rem;
        font-weight: bolder;
        margin-right: 1.2rem;
        min-width: 3rem;
      }

      .con_content {
        width: 100%;
        overflow: hidden;

        .cond_cont {
          display: flex;
          color: #fff;
          white-space: nowrap;
          overflow-y: hidden;
          overflow-x: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          .cond_cont_item {
            border-radius: 5rem;
            margin-right: 1rem;
            font-weight: bold;
            background-color: #303132;
            padding: .5rem 1rem;
            font-size: 1.2rem;
            line-height: 1.2rem;
          }

          .selected {
            color: #d3b44e;
            background-color: #37341e;
          }
        }
      }
    }
  }
  .list{
    margin-top: 20px;
    .item{
      display: flex;
      border-radius: 1rem;
      background-color: #222324;
      margin: .8rem .5rem 0;
      padding: 1rem;
      color: #fff;
      overflow: hidden;

      .img{
        width: 8rem !important;
        height: 10rem;
        overflow: hidden;

        img{
          height: 100%;
          width: 100%;
        }
      }

      .content{
        margin-left: 1rem;
        flex: 1;

        .title {
          font-size: 2rem;
          max-width: 25rem;
          text-align: left;
          font-weight: bolder;
          margin-bottom: .5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tag_div{
          display: flex;

          .tag{
            background-color: #38393a;
            border-radius: 2rem;
            margin-right: 1rem;
            padding: .5rem 1rem;
          }
        }

        .intro {
          margin-top: 1rem;
        }
      }
    }
  }
}

</style>
