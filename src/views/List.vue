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

      <div class="btn_create" v-if="isLogin">
        <el-button size="mini" round @click="gotoEdit()">新增</el-button>
      </div>
    </div>
    <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="item" v-for="item in listData" :key="item.id" @click="goto(item)">
        <div class="img">
          <img :src="item.coverImg" alt="img">
        </div>
        <div class="content">
          <i class="btn el-icon-edit" @click.stop="gotoEdit(item)" v-if="isLogin"></i>
          <div class="title">
            {{ item.title }}
          </div>
          <div class="tag_div">
            <div class="tag_inner">
              <div class="tag" v-if="item.personCount">{{ item.personCount }}人</div>
              <div class="tag" v-if="item.background">{{ item.background | backFilter }}</div>
              <!-- <div class="tag" v-for="it in item.theme" :key="it" >{{ it | themeFilter }}</div> -->
              <div class="tag" v-if="item.theme">{{ item.theme | themeFilter }}</div>
              <div class="tag" v-if="item.level">{{ item.level | levelFilter }}</div>
              <div class="tag status" v-if="isLogin && item.status === 1">已下线</div>
            </div>
          </div>
          <div class="intro">{{ item.content }}</div>
        </div>
      </div>
      <div class="list_end">
        <span>{{ loading ? '请稍后' : '已经到底了'}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import Constant from '@/assets/js/constant.js';
import http from '@/assets/js/request';
import { getCookie } from '@/assets/js/utils';
// import axios from 'axios';

const backMap = {
  1: '古风',
  2: '民国',
  3: '现代',
  4: '科幻',
  5: '欧式',
  6: '日式'
}
const themeMap = {
  1: '恐怖',
  2: '情感',
  3: '推理',
  4: '欢乐',
  5: '阵营',
  6: '机制',
  7: '谍战',
  8: '武侠',
  9: '玄幻',
  10: '校园',
  11: '立意',
  12: '其他'
};
const levelMap = {
  1: '新手',
  2: '进阶',
  3: '王者',
};
export default {
  data() {
    return {
      listData: [],
      conditionData: Constant.condition,
      current: 1,
      pages: 0,
      size: 10,
      loading: false,
      isLogin: false,
      queryForm: {
        personCount: 0,
        background: 0,
        theme: 0,
        level: 0,
      },
    };
  },
  filters: {
    backFilter: (_input) => backMap[_input],
    themeFilter: (_input) => themeMap[_input],
    levelFilter: (_input) => levelMap[_input],
  },
  mounted() {
    this.getLoginInfo();
    this.query();

    let { a } = this.$route.query;
    console.log(a);
    if(a === '1'){
      this.$router.push({
        path: '/login'
      });
    }
  },
  watch: {
    queryForm: {
      handler(newVal, oldVal) {
        this.current = 1;
        this.query();
      },
      deep: true,
    },
  },
  methods: {
    loadMore() {
      let { pages } = this;
      if(this.current >= pages) {
        return;
      }

      this.current++;
      this.query();
    }, 
    async getLoginInfo() {
      try {
        let res = await http.get('/user/status');
        if(res.code === 0) {
          this.isLogin = res.data;
        } else {
          this.isLogin = false;
        }
      } catch(e) {
        console.log(e);
      }
    }, 
    async query() {
      let { personCount, background, theme, level } = this.queryForm;
      let { current, size } = this;

      try {
        this.loading = true;
        let res = await http.get(`/article?current=${current}&size=${size}&personCount=${personCount}&background=${background}&theme=${theme}&level=${level}`);
        if(res.code === 0) {
          if(current === 1) {
            this.listData = res.data.records;
          } else {
            this.listData = this.listData.concat(res.data.records);
          }
          this.total = res.data.total;
          this.current = res.data.current;
          this.pages = res.data.pages;
        } else {
          console.log('列表接口异常');
        }
      } catch(e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
          this.loading = false;
        }, 1000);
      }

      // let res = await axios.get('/json/note.json');
      // res = res.data;
      // if (res.code === 0) {
      //   this.listData = res.data.list;
      // } else {
      //   console.log('error');
      // }
    },
    goto(_item) {
      this.$router.push({
        path: `/detail?id=${_item.id}`,
      });
    },
    gotoEdit(_item) {
      let path = `/edit`;
      if(_item) {
        path += `?id=${_item.id}`
      }
      this.$router.push({
        path
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
    position: relative;

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

    .btn_create{
      position: absolute;
      right: 1rem;
      bottom: -.2rem;
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
        position: relative;
        max-width: 30rem;

        .btn{
          position: absolute;
          font-size: 1.4rem;
          right: 0;
          top: .1rem;
          line-height: 1.6rem;
          border-radius: 1.4rem;
          width: 2rem;
          text-align: center;
        }

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
          
          .tag_inner {
            display: flex;

            .tag{
              background-color: #38393a;
              white-space: nowrap;
              border-radius: 2rem;
              margin-right: 1rem;
              padding: .5rem 1rem;
            }
            .status{
              color: #d3b44e;
            }
          }
        }

        .intro {
          margin-top: 1rem;
        }
      }
    }

    .list_end{
      text-align: center;
      margin: 1rem 0 .5rem;
    }
  }

  .msg{
    font-size: 1.4rem;
    color: #000;
  }
}

</style>
