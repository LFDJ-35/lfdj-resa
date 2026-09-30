<script setup lang="ts">
import '@material/web/chips/assist-chip'
import '@material/web/dialog/dialog'
import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'

import { Member } from '../models/member'
import { type PropType } from 'vue'
import { memberIsIdentity } from '@/stores/identity'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'remove', member: Member): void
  (e: 'add'): void
  (e: 'author-remove'): void
}>()

const props = defineProps({
  members: { type: Object as PropType<Member[]>, required: true },
  canAddMember: Boolean,
  author: { type : Object as PropType<Member> },
})
</script>

<template>
  <md-list class="player-list">
    <md-list-item v-if="props.author">
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <div slot="headline">{{ props.author?.toString() }}</div>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <md-icon v-if="!memberIsIdentity(author)" slot="end">crown</md-icon>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <md-icon v-else class="clickable" slot="end" @click="$emit('author-remove')">delete</md-icon>
    </md-list-item>
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
