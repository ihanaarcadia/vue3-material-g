<template>
  <md-empty-state v-bind="$props" class="md-table-empty-state">
    <slot />
  </md-empty-state>
</template>

<script>
  import MdEmptyState from '@/components/MdEmptyState/MdEmptyState.vue'
  import MdEmptyStateProps from '@/components/MdEmptyState/MdEmptyStateProps'

  export default {
    name: 'MdTableEmptyState',
		components:{MdEmptyState},
    props: MdEmptyStateProps,
    inject: ['MdTable']
  }
</script>

<style lang="scss">
  @use "@/components/MdAnimation/variables";

  .md-table-empty-state {
    padding-left: 24px;
  }
</style>
