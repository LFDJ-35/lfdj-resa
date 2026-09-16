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

import { closeDialog, openDialog } from "./utils/dialogs";
import { checkMdOutlinedTextFieldValidity, findRecursiveNamedItem } from "./utils/forms";

const props = defineProps({
  table_data: { type: Object as PropType<TTRPGTableModel>, required: true }
});

const table = ref(props.table_data);

const memberToRemove = ref<Member | null>(null);

const addPlayerDialogRef = ref<MdDialog | null>(null);
const removePlayerDialogRef = ref<MdDialog | null>(null);

function add_player(): boolean {
  if (addPlayerDialogRef.value === null) {
    return false;
  }

  const name = findRecursiveNamedItem(addPlayerDialogRef.value, "name") as MdOutlinedTextField;
  const pseudo = findRecursiveNamedItem(addPlayerDialogRef.value, "pseudo") as MdOutlinedTextField;

  let noValidationError = true;
  noValidationError = checkMdOutlinedTextFieldValidity(name, "Le nom du joueur doit contenir au moins un caractère") && noValidationError;
  noValidationError = checkMdOutlinedTextFieldValidity(pseudo, "Le pseudo du joueur doit contenir au moins un caractère") && noValidationError;

  if (!noValidationError) {
    return false;
  }

  console.debug(`Le membre [${pseudo.value} | ${name.value}] est ajouté à la table.`);
  table.value.add_player(new Member(pseudo.value, name.value));

  closeDialog(addPlayerDialogRef.value);

  return true;
}

function removePlayer(member: Member | null): boolean {
  if (member === null) { return false };

  console.debug(`Le membre ${member.pseudo} est retiré de la table.`);;
  return table.value.remove_player(member);
}

function openRemovePlayerDialog(member: Member) {
  memberToRemove.value = member;
  openDialog(removePlayerDialogRef.value);
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
            <md-icon class="clickable" slot="end" @click="() => openRemovePlayerDialog(member)">person_remove</md-icon>
          </md-list-item>
        </template>
        <template v-else>
          <md-list-item @click="() => openDialog(addPlayerDialogRef)" class="clickable"
            title="Cliquez pour inscrire un joueur" aria-label="Inscrire un joueur">
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
  <md-dialog ref="addPlayerDialogRef" id="addPlayerDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Inscription d'un joueur à la table [{{ table.title }}]</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form slot="content" class="dialog-inscription" method="dialog">
      <md-outlined-text-field required name="pseudo" label="Pseudo Discord" pattern=".+"
        placeholder="Pseudo du joueur"></md-outlined-text-field>
      <md-outlined-text-field required name="name" label="Prénom" pattern=".+"
        placeholder="Prénom du joueur"></md-outlined-text-field>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(addPlayerDialogRef)">Annuler</md-text-button>
      <md-text-button @click="add_player">Confirmer l'inscription</md-text-button>
    </div>
  </md-dialog>

  <md-dialog id="removePlayerDialogRef" ref="removePlayerDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form slot="content">Souhaitez-vous désinscrire <b>{{ memberToRemove?.pseudo }} [{{ memberToRemove?.name }}] </b> de
      la
      table <b>{{ table.title }} </b> ?</form>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(removePlayerDialogRef)">Annuler</md-text-button>
      <md-text-button @click="() => { removePlayer(memberToRemove); closeDialog(removePlayerDialogRef) }">Confirmer la
        suppression</md-text-button>
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


#addPlayerDialogRef>form {
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
