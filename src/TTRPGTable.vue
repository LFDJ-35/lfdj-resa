<script setup lang="ts">

import "@material/web/chips/assist-chip";
import "@material/web/dialog/dialog";
import "@material/web/icon/icon";
import "@material/web/list/list";
import "@material/web/list/list-item";

import { MdOutlinedTextField } from "@material/web/all";
import { MdDialog } from "@material/web/dialog/dialog";
import { ref, type PropType } from "vue";
import { AVAILABLE_MEMBER_SENTINEL } from "./data/members";
import { format_date_hour } from "./formatters/date";
import { Member } from "./models/member";
import { TTRPGTableModel } from "./models/table_ttrpg";

const props = defineProps({
  table_data: { type: Object as PropType<TTRPGTableModel>, required: true }
});

const table = ref(props.table_data);

const dialogRef = ref<MdDialog | null>(null);
const textFieldPseudoRef = ref<MdOutlinedTextField | null>(null);
const textFieldNameRef = ref<MdOutlinedTextField | null>(null);


function close_dialog() {
  if (dialogRef.value === null) { return }
  dialogRef.value.close();
}

function open_dialog() {
  if (dialogRef.value === null) { return };
  dialogRef.value.show();
}

function add_player(): boolean {

  if (dialogRef.value === null || textFieldNameRef.value === null || textFieldPseudoRef.value === null) {
    console.warn(`Références nulles`);
    console.debug(`${dialogRef.value}`);
    console.debug(`${textFieldNameRef.value}`);
    console.debug(`${textFieldPseudoRef.value}`);

    return false;
  }

  if (!textFieldNameRef.value.checkValidity()) {
    console.error(`Nom [${textFieldNameRef.value.value}] invalide`);
    return false;
  }

  if (!textFieldNameRef.value.checkValidity()) {
    console.error(`Pseudo [${textFieldPseudoRef.value.value}] invalide`);
    return false;
  }

  const name = textFieldPseudoRef.value.value;
  const pseudo = textFieldPseudoRef.value.value;

  console.debug(`Le membre [${name} | ${pseudo}] est ajouté à la table.`);
  table.value.add_player(new Member(pseudo, name));

  close_dialog();

  return true;
}

function remove_player(member: Member): boolean {
  console.debug(`Le membre ${member.pseudo} est retiré de la table.`);
  return table.value.remove_player(member);
}

</script>

<template>
  <section class="table-view">
    <h3>{{ table.title }}</h3>

    <md-chip-set>
      <md-assist-chip aria-label="Maître du Jeu" title="Maître du Jeu">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon slot="icon">person</md-icon>
        {{ table.author.pseudo }} [{{ table.author.name }}]
      </md-assist-chip>
      <md-assist-chip aria-label="Nombre de Joueurs à la table" title="Nombre de Joueurs à la table">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon slot="icon">group</md-icon>
        <span>{{ table.player_number }}/{{ table.max_players }}</span>
      </md-assist-chip>
      <md-assist-chip aria-label="Heures de début et de fin" title="Heures de début et de fin">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon slot="icon">nest_clock_farsight_analog</md-icon>
        <span>{{ format_date_hour(table.from_date) }}-{{ format_date_hour(table.to_date) }}</span>
      </md-assist-chip>
    </md-chip-set>

    <p>{{ table.description }}</p>

    <md-list class="player-list">
      <template v-for="member in table.players" :key="member.id">
        <template v-if="member.id !== AVAILABLE_MEMBER_SENTINEL.id">
          <md-list-item>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <div slot="headline"> {{ member.pseudo }} [{{ member.name }}]</div>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <md-icon class="clickable" slot="end" @click="() => remove_player(member)">person_remove</md-icon>
          </md-list-item>
        </template>
        <template v-else>
          <md-list-item @click="open_dialog" class="clickable" title="Cliquez pour inscrire un joueur"
            aria-label="Inscrire un joueur">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <div slot="headline"> Disponible </div>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <md-icon slot="end">person_add</md-icon>
          </md-list-item>
        </template>
      </template>
    </md-list>
  </section>

  <!--
  TODO : retravailler l'accessibilité
  - aria
  - tooltips
  - ...
  -->
  <md-dialog ref="dialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Inscription d'un joueur à la table [{{ table.title }}]</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form slot="content" class="dialog-inscription" method="dialog">
      <md-outlined-text-field required ref="textFieldPseudoRef" label="Pseudo Discord" pattern=".+"
        placeholder="Pseudo du joueur"></md-outlined-text-field>
      <md-outlined-text-field required ref="textFieldNameRef" label="Prénom" pattern=".+"
        placeholder="Prénom du joueur"></md-outlined-text-field>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="close_dialog">Annuler</md-text-button>
      <md-text-button @click="add_player">Confirmer l'inscription</md-text-button>
    </div>
  </md-dialog>

</template>

<style scoped>
.table-view {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--md-sys-shape-corner-medium);
  padding: 1em;
  /* https://getcssscan.com/css-box-shadow-examples */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.dialog-headline {
  font-size: x-large;
}


md-dialog>form {
  display: grid;
  row-gap: 1em;
}

.table-view {
  max-width: 20em;
}

@media (max-width: 800px) {
  .dialog-headline {
    font-size: larger;
  }
}
</style>
