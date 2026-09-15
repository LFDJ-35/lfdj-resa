<script setup lang="ts">

import { MdOutlinedTextField } from "@material/web/all";
import "@material/web/dialog/dialog";
import { MdDialog } from "@material/web/dialog/dialog";
import { ref, type PropType } from "vue";
import { AVAILABLE_MEMBER_SENTINEL } from "./data/members";
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
  <h3>{{ table.title }}</h3>

  <p> Maître du jeu : {{ table.author.pseudo }} [{{ table.author.name }}]</p>
  <p> Nombre de joueurs : {{ table.player_number }} / {{ table.max_players }}</p>
  <p> Description : {{ table.description }}</p>

  <table>
    <thead>
      <tr>
        <th>Joueurs</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="member in table.players" :key="member.id">
        <template v-if="member.id === AVAILABLE_MEMBER_SENTINEL.id">
          <td>Disponible</td>
          <td @click="open_dialog">S'inscrire</td>
        </template>
        <template v-else>
          <td>{{ member.pseudo }} [{{ member.name }}]</td>
          <td @click="() => remove_player(member)">Se désinscrire</td>
        </template>
      </tr>
    </tbody>
  </table>

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
md-dialog>form {
  display: grid;
  row-gap: 1em;
}
</style>
