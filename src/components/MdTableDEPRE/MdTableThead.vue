<template>
  <thead>
    <tr>
      <md-table-head-selection />
      <md-table-head v-for="(item, index) in MdTable.items" :key="index" :item="item" />
    </tr>
  </thead>
</template>

<script>
  import MdTableHead from '@/components/MdTable/MdTableHead.vue'
  import MdTableHeadSelection from '@/components/MdTable/MdTableHeadSelection.vue'

  export default {
    name: 'MdTableThead',
		
    inject: ['MdTable'],
    components: {
      MdTableHead,
      MdTableHeadSelection
    }
  }
</script>
