<script setup lang="ts">

import "@material/web/chips/assist-chip";
import "@material/web/dialog/dialog";
import "@material/web/icon/icon";
import "@material/web/list/list";
import "@material/web/list/list-item";

import { MdDialog } from "@material/web/dialog/dialog";
import { ref, type PropType } from "vue";
import { formatDateHour } from "../formatters/date";
import { Member } from "../models/member";
import { TTRPGTableModel } from "../models/table_ttrpg";

import { identity } from "../stores/identity";
import { openDialog } from "../utils/dialogs";
import OnePlayerList from "./OnePlayerList.vue";
import YesNoDialog from "./dialogs/YesNoDialog.vue";

const props = defineProps({
  table_data: { type: Object as PropType<TTRPGTableModel>, required: true }
});

const table = ref(props.table_data);

const addSelfDialogRef = ref<{ thisDialog: MdDialog } | null>(null);
const removeMemberDialogRef = ref<{ thisDialog: MdDialog } | null>(null);

const memberToRemove = ref<Member | null>(null);

function addPlayerWithIdentity() {
  if (identity.value !== null) {
    table.value.addPlayer(identity.value);
  }
}

function removePlayer(member: Member | null): boolean {
  if (member === null) { return false };
  return table.value.removePlayer(member);
}

function openRemovePlayerDialog(member: Member) {
  if (removeMemberDialogRef.value === null) { return }
  memberToRemove.value = member;
  openDialog(removeMemberDialogRef.value.thisDialog);
}

</script>

<template>
  <section class="table-view shadow">
    <h3>{{ table.title }}</h3>

    <md-chip-set>
      <md-assist-chip aria-label="Maître du Jeu" title="Maître du Jeu">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon slot="icon">person</md-icon>
        {{ table.author.toString() }}
      </md-assist-chip>
      <md-assist-chip aria-label="Nombre de Joueurs à la table" title="Nombre de Joueurs à la table">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon slot="icon">group</md-icon>
        <span>{{ table.players.length }}/{{ table.max_players }}</span>
      </md-assist-chip>
      <md-assist-chip aria-label="Heures de début et de fin" title="Heures de début et de fin">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon slot="icon">nest_clock_farsight_analog</md-icon>
        <span>{{ formatDateHour(table.from_date) }}-{{ formatDateHour(table.to_date) }}</span>
      </md-assist-chip>
    </md-chip-set>

    <p>{{ table.description }}</p>

    <OnePlayerList :members="table.players" @add="openDialog(addSelfDialogRef?.thisDialog!)"
      @remove="openRemovePlayerDialog" :can-add-member="table.canInsertPlayer() && identity !== null">
    </OnePlayerList>

  </section>

  <YesNoDialog ref="addSelfDialogRef" v-if="identity !== null" :title="'S\'inscrire à la table [' + table.title + ']'"
    accept="S'inscrire" refuse="Annuler l'inscription"
    :emphasis="'Vous serez inscrit en tant que ' + identity.toString()" @accepted="addPlayerWithIdentity">
  </YesNoDialog>

  <YesNoDialog ref="removeMemberDialogRef" title="Désinscription"
    :emphasis="'Confirmer la désinscription de ' + memberToRemove?.toString() + ' ?'" accept="Désincrire"
    refuse="Annuler" @accepted="() => { removePlayer(memberToRemove) }">
  </YesNoDialog>

</template>

<style scoped>
.table-view {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--md-sys-shape-corner-medium);
  padding: 1em;
  max-width: 20em;
}
</style>
