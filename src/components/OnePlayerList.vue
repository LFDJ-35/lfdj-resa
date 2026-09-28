<script setup lang="ts">
import '@material/web/chips/assist-chip'
import '@material/web/dialog/dialog'
import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'

import { Member } from '../models/member'
import { type PropType } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'remove', member: Member): void
  (e: 'add'): void
}>()

const props = defineProps({
  members: { type: Object as PropType<Member[]>, required: true },
  canAddMember: Boolean,
})
</script>

<template>
  <md-list class="player-list">
    <template v-for="member in props.members" :key="member.id">
      <md-list-item>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div slot="headline">{{ member.toString() }}</div>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <md-icon class="clickable" slot="end" @click="$emit('remove', member)">person_remove</md-icon>
      </md-list-item>
    </template>

    <md-list-item v-if="props.canAddMember" @click="$emit('add')" class="clickable"
      title="Cliquez pour inscrire un joueur" aria-label="Inscrire un joueur">
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <div slot="headline">Disponible</div>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <md-icon slot="end">person_add</md-icon>
    </md-list-item>
  </md-list>
</template>

<style scoped></style>
