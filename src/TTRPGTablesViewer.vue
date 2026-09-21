<script setup lang="ts">
import { MdDialog, MdOutlinedTextField } from '@material/web/all'
import '@material/web/tabs/tabs'
import { ref } from 'vue'
import { format_date_day } from './formatters/date.ts'
import { Member } from './models/member.ts'
import { TTRPGTableModel } from './models/table_ttrpg.ts'
import { sessionStore } from './stores/session.ts'
import TTRPGTable from './TTRPGTable.vue'
import { closeDialog, openDialog } from './utils/dialogs.ts'
import { FieldsValidator, findRecursiveNamedItem } from './utils/forms.ts'
import { identity } from './stores/identity.ts'

const dialogRef = ref<MdDialog | null>(null)

function add_table() {
  console.log(dialogRef.value)

  if (dialogRef.value === null) {
    return
  }

  const formContent = dialogRef.value.children.namedItem('content') as HTMLFormElement
  const title = findRecursiveNamedItem(formContent, 'title') as MdOutlinedTextField
  const pseudo = findRecursiveNamedItem(formContent, 'pseudo') as MdOutlinedTextField
  const name = findRecursiveNamedItem(formContent, 'prenom') as MdOutlinedTextField
  const players = findRecursiveNamedItem(formContent, 'players') as MdOutlinedTextField
  const description = findRecursiveNamedItem(formContent, 'description') as MdOutlinedTextField

  const fieldsValidator = new FieldsValidator()
    .addValidator(title, 'Le titre de la table doit au moins contenir un caractère.')
    .addValidator(players, 'Le nombre de joueurs doit être supérieur à 0')
    .addValidator(description, 'La table doit contenir une description')

  if (identity.value === null) {
    fieldsValidator
      .addValidator(pseudo, 'Le pseudonyme du MJ doit au moins contenir un caractère.')
      .addValidator(name, 'Le prénom du MJ doit au moins contenir un caractère.')
  }

  if (fieldsValidator.validate()) {
    let author = identity.value;
    if (identity.value === null) {
      author = new Member(pseudo.value, name.value);
    }

    const table = new TTRPGTableModel(
      title.value,
      sessionStore.current.from_date,
      sessionStore.current.to_date,
      description.value,
      author!,
      players.valueAsNumber,
    )

    sessionStore.current.tables.push(table)
    // TODO : Enregistrer la table en base de données.

    closeDialog(dialogRef.value)
  }
}
</script>

<template>
  <h2>Tables de jeu de rôle du {{ format_date_day(sessionStore.current.from_date) }}</h2>
  <article class="card-section">
    <TTRPGTable v-for="table in sessionStore.current.tables" :key="table.title" :table_data="table" />
    <div class="add-element-box" @click="() => openDialog(dialogRef)">
      <md-icon>add</md-icon>
      <p>Ajouter une table de jeu de rôle</p>
    </div>
  </article>

  <md-dialog ref="dialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Ajout d'une nouvelle table</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" class="dialog-inscription" method="dialog">
      <p v-if="identity !== null">Ajouter une table en tant que {{ identity.toString() }}</p>
      <md-outlined-text-field required label="Titre de la table" name="title" pattern=".+"
        placeholder="Titre de la table"></md-outlined-text-field>
      <span name="identity" v-if="identity === null">
        <md-outlined-text-field required name="pseudo" label="Pseudo Discord du MJ" pattern=".+"
          placeholder="Pseudo Discord du MJ"></md-outlined-text-field>
        <md-outlined-text-field required name="prenom" label="Prénom du MJ" pattern=".+"
          placeholder="Prénom du MJ"></md-outlined-text-field>
      </span>
      <md-outlined-text-field required type="number" name="players" suffix-text="joueurs" label="Nombre de places"
        pattern="\d+" min=1 max=16 value="4"></md-outlined-text-field>
      <md-outlined-text-field required type="textarea" name="description" label="Description de la table" pattern="\d+"
        placeholder="Description de la table"></md-outlined-text-field>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(dialogRef)">Annuler</md-text-button>
      <md-text-button @click="add_table">Ajouter la table</md-text-button>
    </div>
  </md-dialog>
</template>

<style scoped>
form {
  display: grid;
  grid-row: 2;
  gap: 1em;
}
</style>
