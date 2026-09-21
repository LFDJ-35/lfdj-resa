<script setup lang="ts">
import '@material/web/icon/icon'

import { FAKE_MEMBERS } from '@/data/members'
import { Member } from '@/models/member'

import { closeDialog, openDialog } from '@/utils/dialogs'
import { findRecursiveNamedItem } from '@/utils/forms'
import { MdChipSet, MdDialog, MdFilterChip, MdOutlinedTextField } from '@material/web/all'
import { ref } from 'vue'
import { FieldsValidator } from '@/utils/forms'

type GameType = 'JDF' | 'JCC' | 'JDP' | 'JDR'

interface IMemberSeeking {
  member: Member
  seeking: Set<GameType>
}

const MEMBERS_SEEKING = ref([
  { member: FAKE_MEMBERS[0]!, seeking: new Set(["JDF", "JDR", "JDP"]) },
  { member: FAKE_MEMBERS[1]!, seeking: new Set(["JDF", "JCC", "JDP"]) },
  { member: FAKE_MEMBERS[2]!, seeking: new Set(["JDF"]) },
  { member: FAKE_MEMBERS[1]!, seeking: new Set(["JDF", "JDR", "JDP"]) },
  { member: FAKE_MEMBERS[2]!, seeking: new Set(["JDF", "JDR", "JDP"]) },
  { member: FAKE_MEMBERS[0]!, seeking: new Set(["JDF", "JDR", "JDP"]) },
])

const ICON_MAP: Map<GameType, string> = new Map([
  ["JDF", "swords"],
  ["JCC", "playing_cards"],
  ["JDR", "casino"],
  ["JDP", "chess"]
])

const LABEL_ADD_MEMBER_SEEKING_TABLE = "S'inscrire en tant que membre recherchant une table";

const addMemberSeekingDialogRef = ref<MdDialog | null>(null);

function addMemberToSeekingMembers(): void {

  if (addMemberSeekingDialogRef.value === null) {
    return;
  }

  // Récupération du nom et pseudo
  const pseudo = findRecursiveNamedItem(addMemberSeekingDialogRef.value, "pseudo") as MdOutlinedTextField;
  const prenom = findRecursiveNamedItem(addMemberSeekingDialogRef.value, "prenom") as MdOutlinedTextField;

  // Récupération des valeurs de chips
  const chips = (findRecursiveNamedItem(addMemberSeekingDialogRef.value, "jeux") as MdChipSet).chips as MdFilterChip[];

  const noValidationError = new FieldsValidator()
    .addValidator(pseudo, 'Le pseudo discord doit comporter au moins un caractère')
    .addValidator(prenom, 'Le prénom doit comporter au moins un caractère')
    .validate()

  const seeking = new Set<GameType>();

  for (const chip of chips) {
    const chipName = chip.attributes.getNamedItem("name");
    if (chip.selected && chipName !== null) {
      seeking.add(chipName.value as GameType)
    }
  }

  if (seeking.size === 0 || !noValidationError) {
    return;
  }

  const seekingMember: IMemberSeeking = {
    member: new Member(pseudo.value, prenom.value),
    seeking: seeking
  }

  MEMBERS_SEEKING.value.push(seekingMember);

  closeDialog(addMemberSeekingDialogRef.value);

}

</script>

<template>
  <h2>Membres en quête de jeux !</h2>

  <section class="card-section">
    <div class="card shadow" v-for="member in MEMBERS_SEEKING" :key="member.member.id">
      <p>{{ member.member.pseudo }} [{{ member.member.name }}]</p>
      <md-chip-set>
        <md-assist-chip disabled v-for="game in member.seeking" :key="game" :label="game">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="icon">{{ ICON_MAP.get(game as GameType) }}</md-icon>
        </md-assist-chip>
      </md-chip-set>
    </div>
    <div class="add-element-box" :aria-label="LABEL_ADD_MEMBER_SEEKING_TABLE" :title="LABEL_ADD_MEMBER_SEEKING_TABLE"
      @click="() => openDialog(addMemberSeekingDialogRef)">
      <md-icon>add</md-icon>
      <p>Je cherche une table !</p>
    </div>
  </section>

  <md-dialog ref="addMemberSeekingDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">S'inscrire en tant que membre cherchant une table</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" class="dialog-inscription" method="dialog">
      <p>Qui êtes-vous ?</p>
      <span name="identity">
        <md-outlined-text-field required name="pseudo" label="Pseudo Discord" pattern=".+"
          placeholder="Pseudo Discord"></md-outlined-text-field>
        <md-outlined-text-field required name="prenom" label="Prénom" pattern=".+"
          placeholder="Prénom"></md-outlined-text-field>
      </span>
      <p>Type de jeu recherché</p>
      <md-chip-set name="jeux">
        <md-filter-chip v-for="mapIt in ICON_MAP.entries()" :key="mapIt[0]" :label="mapIt[0]" :name=mapIt[0]>
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
