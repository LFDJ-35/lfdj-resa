<script setup lang="ts">
import AddTableDialog from '@/components/dialogs/AddTableDialog.vue'
import JDRTable from '@/components/tables/jdr/JDRTable.vue'
import { formatDateDay } from '@/formatters/date.ts'
import type { GameType } from '@/models/games'
import type { TableModel } from '@/models/tables/table_session'
import { identified } from '@/stores/identity.ts'
import { sessionStore } from '@/stores/session.ts'
import { openDialog, type AddTableDialogRef } from '@/utils/dialogs.ts'
import '@material/web/tabs/tabs'
import { computed, ref } from 'vue'

const dialogRef = ref<AddTableDialogRef | null>(null)

const tableType: GameType = "JDR"

const jdrTables = computed(() =>
  sessionStore.current.tables.filter((val) => val.type === tableType),
)

function addTable(tableData: TableModel) {
  tableData.setTableType(tableType)
  sessionStore.current.addTable(tableData)
}
</script>

<template>
  <h2>Tables de jeu de rôle du {{ formatDateDay(sessionStore.current.from_date) }}</h2>
  <article class="card-section">
    <JDRTable v-for="table in jdrTables" :key="table.title" :tableData="table"
      @remove="sessionStore.current.removeTable(table)" />
    <div v-if="identified" class="add-element-box" @click="() => openDialog(dialogRef?.thisDialog)">
      <md-icon>add</md-icon>
      <p>Ajouter une table de jeu de rôle</p>
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
