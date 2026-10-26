<script setup lang="ts">
import type { GameType } from '@/models/games'
import type { TableModel } from '@/models/tables/table_session'
import { identified } from '@/stores/identity.ts'
import { sessionStore } from '@/stores/session.ts'
import '@material/web/tabs/tabs'
import { computed } from 'vue'
import JDFTable from '@/components/tables/jdf/JDFTable.vue'
import JCCTable from '@/components/tables/jcc/JCCTable.vue'
import JDPTable from '@/components/tables/jdp/JDPTable.vue'
import JDRTable from '@/components/tables/jdr/JDRTable.vue'
import { filterStore } from '@/stores/filters'

const props = defineProps<{
  when: ("après-midi" | "soirée")
}>()

const tablesByType = computed(() => {
  return sessionStore.current.tables.filter((table) => !filterStore.hide.has(table.type))
})

const tablesByTime = computed(() => {
  const timeFilter = props.when === "après-midi" ? 14 : 20;
  return tablesByType.value.filter((tables) => tables.from_date.getHours() === timeFilter)
})


function ofType(tables: TableModel[], type: GameType): TableModel[] {
  return tables.filter((t) => t.type === type)
}

const jdfTables = computed(() => {
  return ofType(tablesByTime.value, "JDF")
})
const jdrTables = computed(() => {
  return ofType(tablesByTime.value, "JDR")
})
const jdpTables = computed(() => {
  return ofType(tablesByTime.value, "JDP")
})
const jccTables = computed(() => {
  return ofType(tablesByTime.value, "JCC")
})

</script>

<template>

  <JDFTable v-for="table in jdfTables" :key="table.id" :table-data="table"></JDFTable>
  <JDRTable v-for="table in jdrTables" :key="table.id" :table-data="table"></JDRTable>
  <JCCTable v-for="table in jccTables" :key="table.id" :table-data="table"></JCCTable>
  <JDPTable v-for="table in jdpTables" :key="table.id" :table-data="table"></JDPTable>

  <div v-if="identified" class="add-element-box" @click="() => { }">
    <md-icon>add</md-icon>
    <p>Ajouter une table</p>
  </div>

</template>

<style scoped></style>
