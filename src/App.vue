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
import MembersSeeking from "./components/MembersSeeking.vue";

// Membres en quête de jeu
const FILTER_ID_REC = "rec";
// Membres en quête de covoiturage
const FILTER_ID_COV = "cov";
// Tables de JDR
const FILTER_ID_JDR = "jdr";
// Tables de JCC
const FILTER_ID_JCC = "jcc";
// Tables de JDF
const FILTER_ID_JDF = "jdf";


const FILTER_CHIPS: FilterChipModel[] = [
  { id: FILTER_ID_REC, label: "Activer la vue Membres en recherche de jeux", icon: "person_alert", text: "Membres en recherche de jeu" },
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

  <h1>La Forge des Joueurs - Planificateur de tables</h1>

  <nav>
    <md-tabs @change="switch_active_session">
      <md-primary-tab v-for="(session, index) in FAKE_SESSIONS" :key="session.from_date"
        :class="{ 'active': index === 0 }">{{
          format_date_day(session.from_date) }}
      </md-primary-tab>
    </md-tabs>
    <FilterChips id="filter-chips" :chips=FILTER_CHIPS></FilterChips>
    <md-divider></md-divider>
  </nav>

  <MembersSeeking v-if="!filterStore.hide.has(FILTER_ID_REC)" />
  <div v-if="!filterStore.hide.has(FILTER_ID_COV)">Placeholder covoiturage</div>
  <TTRPGTablesViewer v-if="!filterStore.hide.has(FILTER_ID_JDR)" />
  <div v-if="!filterStore.hide.has(FILTER_ID_JDF)">Placeholder JDF</div>
  <div v-if="!filterStore.hide.has(FILTER_ID_JCC)">Placeholder JCC</div>

</template>


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

.add-element-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  border: 1px rgba(0, 0, 0, 0.2) dashed !important;
  border-radius: var(--md-sys-shape-corner-medium);

  max-width: 15em;
  padding: 1em;
}

.add-element-box:hover {
  cursor: pointer;
}

.card {
  border-radius: var(--md-sys-shape-corner-small);
  border: 1px rgba(0, 0, 0, 0.2) solid;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  padding: 1em;
  max-width: 20em;
}

/* Une section qui contient des .card */
.card-section {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

nav {
  display: grid;
  grid-column: 1;
  gap: 1em;
}

h1,
h2 {
  text-align: center;
}

.shadow {
  /* https://getcssscan.com/css-box-shadow-examples */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}


/* Sur un affichage mobile*/
@media (max-width: 800px) {

  .add-element-box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .card-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: start;
  }
}
</style>
