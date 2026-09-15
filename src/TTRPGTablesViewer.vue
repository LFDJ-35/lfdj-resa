<script setup lang="ts">

import { MdPrimaryTab, MdTabs } from "@material/web/all";
import "@material/web/tabs/tabs";
import { ref } from 'vue';
import { FAKE_SESSIONS } from './data/sessions.ts';
import { format_date_day } from './formatters/date.ts';
import TTRPGTable from './TTRPGTable.vue';

// TODO : Réaliser une récupération des tables.

const current_tab_index = ref(0);
const current_session = ref(FAKE_SESSIONS[current_tab_index.value])

function switch_active_session(event: Event) {

  if (event.target === undefined || event.target === null) {
    return
  };
  current_tab_index.value = (event.target as MdTabs).activeTabIndex
  current_session.value = FAKE_SESSIONS[current_tab_index.value]
}

</script>

<template>

  <md-tabs @change="switch_active_session">
    <md-primary-tab v-for="(session, index) in FAKE_SESSIONS" :key="session.from_date"
      :class="{ 'active': index === 0 }">{{
        format_date_day(session.from_date) }}
    </md-primary-tab>
  </md-tabs>

  <h2> Tables de jeu de rôle du {{ format_date_day(current_session?.from_date) }}</h2>
  <article class="ttrpg-tables-view">
    <TTRPGTable v-for="table in current_session?.tables" :key="table.title" :table_data="table" />
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
