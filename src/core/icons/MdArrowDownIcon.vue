<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
      <path d="M0-.75h24v24H0z" fill="none" />
    </svg>
  </md-icon>
</template>

<script>
  import MdIcon from '@/components/MdIcon/MdIcon.vue'

  export default {
    name: 'MdArrowDownIcon',
    components: {
      MdIcon
    }
  }
</script>
