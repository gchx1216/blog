<template>
  <div>
      <h1>welcome to Xiao Guo</h1>
      <p>上次登录时间：{{time | moment}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time : localStorage.getItem('last'),
    }
  }
}
</script>

<style>
h1 {
  margin-bottom: 10px;
}
</style>