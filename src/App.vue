<script setup lang="ts">
import "@material/web/fab/fab";
import "@material/web/icon/icon";
import "@material/web/tabs/primary-tab";
import "@material/web/tabs/tabs";

import { ref } from "vue";

import { MdTabs } from "@material/web/tabs/tabs";
import TTRPGTablesViewer from './TTRPGTablesViewer.vue';
import { FAKE_SESSIONS } from "./data/sessions.ts";
import { format_date_day } from "./formatters/date.ts";
import type { LFDJSessionModel } from "./models/session.ts";
import { sessionStore } from "./stores/session.ts";


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

  <md-tabs @change="switch_active_session">
    <md-primary-tab v-for="(session, index) in FAKE_SESSIONS" :key="session.from_date"
      :class="{ 'active': index === 0 }">{{
        format_date_day(session.from_date) }}
    </md-primary-tab>
  </md-tabs>
  <TTRPGTablesViewer />

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
