<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/img/logo.png"> -->
    <HelloWorld msg="欢迎来到 壹疑以议"/>
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import List from '@/views/List.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    List,
  },
};
</script>
