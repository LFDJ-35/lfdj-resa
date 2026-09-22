<script setup lang="ts">
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'

import '@material/web/dialog/dialog'
import { MdDialog } from '@material/web/dialog/dialog'
import { MdOutlinedTextField } from '@material/web/all'
import { findRecursiveNamedItem, FieldsValidator } from '@/utils/forms'

import { identity } from '@/stores/identity'
import { ref } from 'vue'
import { Member } from '@/models/member'

import { closeDialog, openDialog } from '@/utils/dialogs'

const loginDialogRef = ref<MdDialog | null>(null)
const logoutDialogRef = ref<MdDialog | null>(null)

function openLoginModal() {
  if (identity.value === null) {
    openDialog(loginDialogRef.value)
  } else {
    openDialog(logoutDialogRef.value)
  }
}

function logIn() {
  if (loginDialogRef.value === null) {
    return
  }

  const pseudo = findRecursiveNamedItem(loginDialogRef.value, 'pseudo') as MdOutlinedTextField
  const prenom = findRecursiveNamedItem(loginDialogRef.value, 'prenom') as MdOutlinedTextField
  const noValidationError = new FieldsValidator()
    .addValidator(pseudo, 'Le pseudo discord doit comporter au moins un caractère')
    .addValidator(prenom, 'Le prénom doit comporter au moins un caractère')
    .validate()

  if (noValidationError) {
    identity.value = new Member(pseudo.value, prenom.value)
    closeDialog(loginDialogRef.value)
  }
}

function logOut() {
  identity.value = null
  closeDialog(logoutDialogRef.value)
}
</script>

<template>
  <md-fab @click="openLoginModal">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <md-icon v-if="identity === null" slot="icon">login</md-icon>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <md-icon v-else slot="icon">logout</md-icon>
  </md-fab>

  <md-dialog ref="loginDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Continuer en tant que</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" method="dialog">
      <p>Qui êtes-vous ?</p>
      <md-outlined-text-field required name="pseudo" label="Pseudo Discord" pattern=".+"
        placeholder="Pseudo Discord"></md-outlined-text-field>
      <md-outlined-text-field required name="prenom" label="Prénom" pattern=".+"
        placeholder="Prénom"></md-outlined-text-field>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(loginDialogRef)">Annuler</md-text-button>
      <md-text-button @click="logIn">Confirmer</md-text-button>
    </div>
  </md-dialog>

  <md-dialog ref="logoutDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">
      Connecté en tant que : {{ identity?.toString() }}
    </h2>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(logoutDialogRef)">Sortir</md-text-button>
      <md-text-button @click="logOut">Se déconnecter</md-text-button>
    </div>
  </md-dialog>
</template>

<style scoped>
md-fab {
  position: fixed;
  bottom: 1em;
  right: 1em;
}
</style>
