<script setup lang="ts">
import JDFTable from '@/components/tables/jdf/JDFTable.vue'
import { formatDateDay } from '@/formatters/date.ts'
import { JDFTableModel } from '@/models/tables/table_jdf'
import { identified, identity } from '@/stores/identity.ts'
import { sessionStore } from '@/stores/session.ts'
import { closeDialog, openDialog } from '@/utils/dialogs.ts'
import { FieldsValidator, findRecursiveNamedItem } from '@/utils/forms.ts'
import { MdDialog, MdOutlinedTextField } from '@material/web/all'
import '@material/web/tabs/tabs'
import { computed, ref } from 'vue'

const dialogRef = ref<MdDialog | null>(null)

const jdfTables = computed(() => sessionStore.current.tables
  .filter((val) => val.type === "Jeu de figurines")
)

function validateAndAddTable() {
  console.log(dialogRef.value)

  const author = identity.value

  if (dialogRef.value === null || author === null) {
    return
  }

  const formContent = dialogRef.value.children.namedItem('content') as HTMLFormElement
  const title = findRecursiveNamedItem(formContent, 'title') as MdOutlinedTextField
  const players = findRecursiveNamedItem(formContent, 'players') as MdOutlinedTextField
  const description = findRecursiveNamedItem(formContent, 'description') as MdOutlinedTextField

  const fieldsValidator = new FieldsValidator()
    .addValidator(title, 'Le titre de la table doit au moins contenir un caractère.')
    .addValidator(players, 'Le nombre de joueurs doit être supérieur à 0')
    .addValidator(description, 'La table doit contenir une description')

  if (fieldsValidator.validate()) {
    const table = new JDFTableModel(
      title.value,
      sessionStore.current.from_date,
      sessionStore.current.to_date,
      description.value,
      author,
      [],
      players.valueAsNumber,
    )

    sessionStore.current.addTable(table)
    closeDialog(dialogRef.value)
  }
}
</script>

<template>
  <h2>Tables de jeu de figurines du {{ formatDateDay(sessionStore.current.from_date) }}</h2>
  <article class="card-section">
    <JDFTable v-for="table in jdfTables" :key="table.title" :tableData="table"
      @remove="() => sessionStore.current.removeTable(table)" />
    <div v-if="identified" class="add-element-box" @click="() => openDialog(dialogRef)">
      <md-icon>add</md-icon>
      <p>Ajouter une table de jeu de figurines</p>
    </div>
  </article>

  <md-dialog ref="dialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Ajout d'une nouvelle table</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" method="dialog">
      <p v-if="identity !== null">Ajouter une table en tant que <b>{{ identity.toString() }}</b></p>
      <md-outlined-text-field required label="Titre de la table" name="title" pattern=".+"
        placeholder="Titre de la table"></md-outlined-text-field>
      <md-outlined-text-field required type="number" name="players" suffix-text="joueurs" label="Nombre de places"
        pattern="\d+" min=1 max=16 value="4"></md-outlined-text-field>
      <md-outlined-text-field required type="textarea" name="description" label="Description de la table" pattern="\d+"
        placeholder="Description de la table"></md-outlined-text-field>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(dialogRef)">Annuler</md-text-button>
      <md-text-button @click="validateAndAddTable">Ajouter la table</md-text-button>
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
