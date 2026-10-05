<script setup lang="ts">
import '@material/web/chips/chip-set'
import '@material/web/chips/filter-chip'
import '@material/web/icon/icon'

import { type FilterChipModel } from '@/models/filter_chip'
import { filterStore } from '@/stores/filters'
import type { MdFilterChip } from '@material/web/chips/filter-chip'
import type { PropType } from 'vue'

const props = defineProps({
  chips: { type: Object as PropType<FilterChipModel[]>, required: true },
})

const FILTER_CHIPS: FilterChipModel[] = props.chips

function updateFilters(e: Event) {
  console.log(e.target as MdFilterChip)

  const filterChip = e.target as MdFilterChip
  const filterID = filterChip.attributes.getNamedItem('data-id')?.value

  if (!filterChip.selected) {
    console.debug(`Désactivation de la vue [${filterID}]`)
    filterStore.hide.add(filterID)
  } else {
    console.debug(`Activation de la vue [${filterID}]`)
    filterStore.hide.delete(filterID)
  }
}
</script>

<template>
  <md-chip-set>
    <md-filter-chip
      @click="updateFilters"
      selected
      v-for="chip in FILTER_CHIPS"
      :key="chip.id"
      :aria-label="chip.label"
      :title="chip.label"
      :data-id="chip.id"
    >
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <md-icon slot="icon"> {{ chip.icon }}</md-icon>
      {{ chip.text }}
    </md-filter-chip>
  </md-chip-set>
</template>

<style scoped></style>
