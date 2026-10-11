<script setup lang="ts">
import { formatDateDay } from '@/formatters/date.ts'
import { identified } from '@/stores/identity.ts'
import { openDialog, type AddTableDialogRef } from '@/utils/dialogs.ts'
import '@material/web/tabs/tabs'
import { computed, ref } from 'vue'
import JCCTable from './JCCTable.vue'
import AddTableDialog from '@/components/dialogs/AddTableDialog.vue'
import type { TableModel } from '@/models/tables/table_session.ts'
import type { GameType } from '@/models/games.ts'
import { sessionStore } from '@/stores/session.ts'

const dialogRef = ref<AddTableDialogRef | null>(null)

const tableType: GameType = "JCC"

const jccTables = computed(() =>
  sessionStore.current.tables.filter((val) => val.type === tableType),
)

function addTable(tableData: TableModel) {
  tableData.setTableType(tableType)
  sessionStore.current.addTable(tableData)
}

</script>

<template>
  <h2>
    Tables de jeu de cartes à collectionner du {{ formatDateDay(sessionStore.current.from_date) }}
  </h2>
  <article class="card-section">
    <JCCTable v-for="table in jccTables" :key="table.title" :tableData="table"
      @remove="() => sessionStore.current.removeTable(table)" />
    <div v-if="identified" class="add-element-box" @click="() => openDialog(dialogRef?.thisDialog)">
      <md-icon>add</md-icon>
      <p>Ajouter une table de jeu de cartes à collectionner</p>
    </div>
  </article>

  <AddTableDialog ref="dialogRef" @add-table="addTable"></AddTableDialog>
</template>

<style scoped>
form {
  display: grid;
  grid-row: 2;
  gap: 1em;
}
</style>
