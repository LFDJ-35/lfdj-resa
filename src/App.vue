<script setup lang="ts">
import "@material/web/fab/fab";
import "@material/web/icon/icon";
import TTRPGTablesViewer from './TTRPGTablesViewer.vue';

</script>

<template>
  <TTRPGTablesViewer />
  <md-fab aria-label="add" id="button-add">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <md-icon slot="icon">add</md-icon>
  </md-fab>
</template>

<style scoped>
#button-add {
  position: fixed;
  bottom: 1em;
  right: 1em;
}
</style>
