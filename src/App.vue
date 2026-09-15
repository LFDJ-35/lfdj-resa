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

<style>
* {
  font-family: "Open Sans";
}

:root {
  --md-ref-typeface-brand: 'Open Sans';
  --md-ref-typeface-plain: system-ui;
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 4px;
  --md-sys-shape-corner-small: 8px;
  --md-sys-shape-corner-medium: 12px;
  /* Cartes classiques */
  --md-sys-shape-corner-large: 16px;
  /* Dialogues, tiroirs */
  --md-sys-shape-corner-extra-large: 28px;
  /* Grands conteneurs M3 */
  --md-sys-shape-corner-full: 9999px;
  /* Boutons, Badges, Chips */
}

md-icon {
  font-family: "Material Symbols Outlined";
}

.clickable:hover {
  cursor: pointer;
}
</style>
