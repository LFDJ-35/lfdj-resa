<script setup lang="ts">
import '@material/web/icon/icon'

import { FAKE_MEMBERS } from '@/data/members'
import { Member } from '@/models/member'

import { identity } from '@/stores/identity'
import { closeDialog, openDialog } from '@/utils/dialogs'
import { findRecursiveNamedItem } from '@/utils/forms'
import { MdChipSet, MdDialog, MdFilterChip } from '@material/web/all'
import { computed, ref, type ComputedRef } from 'vue'

type GameType = 'JDF' | 'JCC' | 'JDP' | 'JDR'

interface IMemberSeeking {
  member: Member
  seeking: Set<GameType>
}

const MEMBERS_SEEKING = ref([
  { member: FAKE_MEMBERS[0]!, seeking: new Set(['JDF', 'JDR', 'JDP']) },
  { member: FAKE_MEMBERS[1]!, seeking: new Set(['JDF', 'JCC', 'JDP']) },
  { member: FAKE_MEMBERS[2]!, seeking: new Set(['JDF']) },
  { member: FAKE_MEMBERS[1]!, seeking: new Set(['JDF', 'JDR', 'JDP']) },
  { member: FAKE_MEMBERS[2]!, seeking: new Set(['JDF', 'JDR', 'JDP']) },
  { member: FAKE_MEMBERS[0]!, seeking: new Set(['JDF', 'JDR', 'JDP']) },
])

const ICON_MAP: Map<GameType, string> = new Map([
  ['JDF', 'swords'],
  ['JCC', 'playing_cards'],
  ['JDR', 'casino'],
  ['JDP', 'chess'],
])

const LABEL_ADD_MEMBER_SEEKING_TABLE = "S'inscrire en tant que membre recherchant une table"

const addMemberSeekingDialogRef = ref<MdDialog | null>(null)

const identityInMembersSeeking: ComputedRef<boolean> = computed(() => {
  const identityMember = identity.value
  return (
    identityMember !== null &&
    MEMBERS_SEEKING.value.find((val) => val.member.id === identityMember.id) === undefined
  )
})

function addMemberToSeekingMembers(): void {
  if (addMemberSeekingDialogRef.value === null || identity.value === null) {
    return
  }

  // Récupération des valeurs de chips
  const chips = (findRecursiveNamedItem(addMemberSeekingDialogRef.value, 'jeux') as MdChipSet)
    .chips as MdFilterChip[]
  const seeking = new Set<GameType>()

  for (const chip of chips) {
    const chipName = chip.attributes.getNamedItem('name')
    if (chip.selected && chipName !== null) {
      seeking.add(chipName.value as GameType)
    }
  }

  if (seeking.size === 0) {
    return
  }

  const seekingMember: IMemberSeeking = {
    member: identity.value,
    seeking: seeking,
  }

  MEMBERS_SEEKING.value.push(seekingMember)

  closeDialog(addMemberSeekingDialogRef.value)
}
</script>

<template>
  <h2>Membres en quête de jeux !</h2>

  <section class="card-section">
    <div class="card shadow" v-for="member in MEMBERS_SEEKING" :key="member.member.id">
      <p>{{ member.member.toString() }}</p>
      <md-chip-set>
        <md-assist-chip disabled v-for="game in member.seeking" :key="game" :label="game">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="icon">{{ ICON_MAP.get(game as GameType) }}</md-icon>
        </md-assist-chip>
      </md-chip-set>
    </div>
    <div
      v-if="identityInMembersSeeking"
      class="add-element-box"
      :aria-label="LABEL_ADD_MEMBER_SEEKING_TABLE"
      :title="LABEL_ADD_MEMBER_SEEKING_TABLE"
      @click="() => openDialog(addMemberSeekingDialogRef)"
    >
      <md-icon>add</md-icon>
      <p>Je cherche une table !</p>
    </div>
  </section>

  <md-dialog ref="addMemberSeekingDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Inscription à la recherche de table</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" method="dialog">
      <p>
        Inscription en tant que <b>{{ identity?.toString() }}</b>
      </p>

      <p>Type de jeu recherché</p>
      <md-chip-set name="jeux">
        <md-filter-chip
          v-for="mapIt in ICON_MAP.entries()"
          :key="mapIt[0]"
          :label="mapIt[0]"
          :name="mapIt[0]"
        >
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="icon">{{ mapIt[1] }}</md-icon>
        </md-filter-chip>
      </md-chip-set>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(addMemberSeekingDialogRef)">Annuler</md-text-button>
      <md-text-button @click="addMemberToSeekingMembers">Confirmer l'inscription</md-text-button>
    </div>
  </md-dialog>
</template>

<style scoped></style>
