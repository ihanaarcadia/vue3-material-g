<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
  </md-icon>
</template>

<script>
  import MdIcon from '@/components/MdIcon/MdIcon.vue'

  export default {
    name: 'MdUpwardIcon',
    components: {
      MdIcon
    }
  }
</script>
