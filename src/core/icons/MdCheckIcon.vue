<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  </md-icon>
</template>

<script>
  import MdIcon from '@/components/MdIcon/MdIcon.vue'

  export default {
    name: 'MdCheckIcon',
    components: {
      MdIcon
    }
  }
</script>
