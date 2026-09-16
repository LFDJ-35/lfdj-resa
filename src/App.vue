<script setup lang="ts">
import "@material/web/chips/chip-set";
import "@material/web/chips/filter-chip";
import "@material/web/fab/fab";
import "@material/web/icon/icon";
import "@material/web/tabs/primary-tab";
import "@material/web/tabs/tabs";

import { ref } from "vue";

import { MdTabs } from "@material/web/tabs/tabs";
import TTRPGTablesViewer from './TTRPGTablesViewer.vue';
import FilterChips from "./components/FilterChips.vue";
import { FAKE_SESSIONS } from "./data/sessions.ts";
import { format_date_day } from "./formatters/date.ts";
import type { FilterChipModel } from "./models/filter_chip.ts";
import type { LFDJSessionModel } from "./models/session.ts";
import { filterStore } from "./stores/filters.ts";
import { sessionStore } from "./stores/session.ts";

const FILTER_ID_COV = "cov";
const FILTER_ID_JDR = "jdr";
const FILTER_ID_JCC = "jcc";
const FILTER_ID_JDF = "jdf";


const FILTER_CHIPS: FilterChipModel[] = [
  { id: FILTER_ID_COV, label: "Activer la vue covoiturage", icon: "local_taxi", text: "Covoiturage" },
  { id: FILTER_ID_JDR, label: "Activer la vue Jeu de rôle", icon: "ifl", text: "Jeu de rôle" },
  { id: FILTER_ID_JCC, label: "Activer la vue Jeu de cartes à collectionner", icon: "playing_cards", text: "Jeu de cartes à collectionner" },
  { id: FILTER_ID_JDF, label: "Activer la vue Jeu de figurines", icon: "chess_pawn", text: "Jeu de figurines" },
]

const currentTabIndex = ref(0);

function switch_active_session(event: Event) {

  if (event.target === undefined || event.target === null) {
    return
  };

  currentTabIndex.value = (event.target as MdTabs).activeTabIndex
  sessionStore.current = FAKE_SESSIONS[currentTabIndex.value] as LFDJSessionModel;
}
</script>

<template>

  <nav>
    <md-tabs @change="switch_active_session">
      <md-primary-tab v-for="(session, index) in FAKE_SESSIONS" :key="session.from_date"
        :class="{ 'active': index === 0 }">{{
          format_date_day(session.from_date) }}
      </md-primary-tab>
    </md-tabs>
    <FilterChips id="filter-chips" :chips=FILTER_CHIPS></FilterChips>
  </nav>

  <div v-if="!filterStore.hide.has(FILTER_ID_COV)">Placeholder covoiturage</div>
  <TTRPGTablesViewer v-if="!filterStore.hide.has(FILTER_ID_JDR)" />
  <div v-if="!filterStore.hide.has(FILTER_ID_JDF)">Placeholder JDF</div>
  <div v-if="!filterStore.hide.has(FILTER_ID_JCC)">Placeholder JCC</div>

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

nav {
  display: grid;
  grid-column: 1;
  gap: 1em;
}
</style>
