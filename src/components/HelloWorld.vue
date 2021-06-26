<template>
  <div class="hello">
    <div style="display: none">
      <img src="../assets/img/logo.jpeg" alt="">
    </div>
    <img alt="Vue logo" src="../assets/img/banner.jpeg">
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  text-align: center;
  // background-color: red;
  padding-bottom: .5rem;

  img{
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    color: #fff;
  }
}

</style>
