<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
      <path d="M0-.25h24v24H0z" fill="none" />
    </svg>
  </md-icon>
</template>

<script>
  import MdIcon from '@/components/MdIcon/MdIcon.vue'

  export default {
    name: 'MdArrowRightIcon',
    components: {
      MdIcon
    }
  }
</script>
