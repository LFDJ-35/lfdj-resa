<script setup lang="ts">

import { VITRE } from './data/places';
import { Member } from './models/member';
import { TTRPGTableModel } from './models/table_ttrpg';
import TTRPGTable from './TTRPGTable.vue';

// TODO : Réaliser une récupération des tables.
const TABLES = [
  new TTRPGTableModel("Jeu de rôle", new Date(), "description", VITRE, new Member("AAA", "BBB"), 4),
  new TTRPGTableModel("Jeu de rôle", new Date(), "description", VITRE, new Member("AAA", "BBB"), 4)
];

</script>

<template>
  <section v-for="table in TABLES" :key="table.title">
    <TTRPGTable :table_data="table" />
  </section>
</template>

<style scoped></style>
