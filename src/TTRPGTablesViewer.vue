<script setup lang="ts">

import "@material/web/tabs/tabs";
import { format_date_day } from './formatters/date.ts';
import { sessionStore } from "./stores/session.ts";
import TTRPGTable from './TTRPGTable.vue';


</script>

<template>

  <h2> Tables de jeu de rôle du {{ format_date_day(sessionStore.current.from_date) }}</h2>
  <article class="ttrpg-tables-view">
    <TTRPGTable v-for="table in sessionStore.current.tables" :key="table.title" :table_data="table" />
    <div id="placeholder-ttrpg-table">
      <md-icon>add</md-icon>
      <p> Ajouter une table de jeu de rôle </p>
    </div>
  </article>
</template>

<style scoped>
h2 {
  text-align: center;
}

.ttrpg-tables-view {
  display: flex;
  gap: 3em;
}

#placeholder-ttrpg-table {
  display: flex;
  flex-direction: column;
  max-width: 20em;
  padding: 1em;
  border-radius: var(--md-sys-shape-corner-medium);
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px rgba(0, 0, 0, 0.2) dashed;
}

#placeholder-ttrpg-table:hover {
  cursor: pointer;
}

/* Affichage mobile */
@media (max-width: 800px) {
  .ttrpg-tables-view {
    width: 75vw;
    margin: auto;
    display: grid;
    grid-column: 1;
  }

  #placeholder-ttrpg-table {
    max-height: 5em;
  }
}
</style>
