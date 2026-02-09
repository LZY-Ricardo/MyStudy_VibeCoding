<template>
    <Person v-if="isShow" />
</template>

<script>
import Person from './components/Person.vue'
  export default {
  name: 'App',
    components: {
      Person
    },
    data() {
      return {
        isShow: true
      }
    }
  }
</script>

<style>

</style>
