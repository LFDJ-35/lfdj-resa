<script setup lang="ts">

import { ref, type PropType } from "vue";
import { Member } from "./models/member";
import { AVAILABLE_MEMBER_SENTINEL } from "./data/members";
import { TTRPGTableModel } from "./models/table_ttrpg"

const props = defineProps({
  table_data: { type: Object as PropType<TTRPGTableModel>, required: true }
});

const table = ref(props.table_data);

const updateInProgress = ref(false);
const updatePlayerName = ref("");
const updatePlayerPseudo = ref("");

function add_player() {
  table.value.add_player(new Member(updatePlayerPseudo.value, updatePlayerName.value));
  updateInProgress.value = false;
  updatePlayerPseudo.value = "";
  updatePlayerName.value = "";
}

function remove_player(member: Member): boolean {
  return table.value.remove_player(member);
}

</script>

<template>
  <h1>Table de jeu de rôle</h1>

  <p> Jeu proposé : {{ table.title }}</p>
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
          <td @click="() => (updateInProgress = true)">S'inscrire</td>
        </template>
        <template v-else>
          <td>{{ member.pseudo }} [{{ member.name }}]</td>
          <td @click="() => remove_player(member)">Se désinscrire</td>
        </template>
      </tr>
    </tbody>
  </table>

  <section v-if="updateInProgress">
    <h2>inscription d'un joueur à la table [{{ table.title }}]</h2>
    <input v-model.trim="updatePlayerPseudo" placeholder="Pseudo du joueur">
    <input v-model.trim="updatePlayerName" placeholder="Nom du joueur">
    <button @click="add_player">Confirmer l'inscription de {{ updatePlayerPseudo }} [{{ updatePlayerName
      }}]</button>
    <button @click="() => (updateInProgress = false)">stop</button>

  </section>


</template>

<style scoped></style>
