<template>
  <div class="home">
  <carousel/>
  <information/>
  </div>
</template>

<script>
import carousel from '@/components/carousel/carousel.vue'
import information from '@/components/information/information.vue'
 export default {
  name: 'Home',
  components:{
    carousel,
    information
  }
}
</script>

<style scope>
</style>
