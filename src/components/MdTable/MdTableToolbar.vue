<template>
  <md-toolbar class="md-table-toolbar md-transparent" :md-elevation="0">
    <slot />
  </md-toolbar>
</template>

<script>
  import MdToolbar from '@/components/MdToolbar/MdToolbar.vue'

  export default {
    name: 'MdTableToolbar',
    components: {
      MdToolbar
    },
    inject: ['MdTable']
  }
</script>

<style lang="scss">
  @use "@/components/MdAnimation/variables";

  .md-table-toolbar {
    padding-left: 24px;

    .md-title {
      flex: 1;
      font-size: 20px;
    }
  }
</style>
