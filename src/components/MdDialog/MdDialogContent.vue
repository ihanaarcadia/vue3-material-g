<template>
  <div :class="['md-dialog-content', $mdActiveTheme]">
    <slot />
  </div>
</template>

<script>
  import MdComponent from '@/core/MdComponent'

  export default new MdComponent({
    name: 'MdDialogContent'
  })
</script>

<style lang="scss">
  @use "@/components/MdAnimation/variables";

  .md-dialog-content {
    padding: 0 24px 24px;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    position: relative;

    &:first-child {
      padding-top: 24px;
    }

    p:first-child:not(:only-child) {
      margin-top: 0;
    }

    p:last-child:not(:only-child) {
      margin-bottom: 0;
    }
  }
</style>
