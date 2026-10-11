<script setup lang="ts">
import { TableModel } from '@/models/tables/table_session'
import { identity } from '@/stores/identity.ts'
import { sessionStore } from '@/stores/session.ts'
import { closeDialog } from '@/utils/dialogs.ts'
import { FieldsValidator, findRecursiveNamedItem, MdRadioGroup } from '@/utils/forms.ts'
import { MdDialog, MdOutlinedTextField, MdRadio } from '@material/web/all'
import '@material/web/tabs/tabs'
import { ref } from 'vue'

const dialogRef = ref<MdDialog | null>(null)

const emit = defineEmits<{
  (e: 'add-table', tableData: TableModel): void
}>();

defineExpose({ thisDialog: dialogRef })

function validateTable() {

  const author = identity.value

  if (dialogRef.value === null || author === null) {
    return
  }

  const formContent = dialogRef.value.children.namedItem('content') as HTMLFormElement
  const title = findRecursiveNamedItem(formContent, 'title') as MdOutlinedTextField
  const players = findRecursiveNamedItem(formContent, 'players') as MdOutlinedTextField
  const description = findRecursiveNamedItem(formContent, 'description') as MdOutlinedTextField
  const period = new MdRadioGroup(findRecursiveNamedItem(formContent, 'when-radio-group') as Element)

  const fieldsValidator = new FieldsValidator()
    .addValidator(title, 'Le titre de la table doit au moins contenir un caractère.')
    .addValidator(players, 'Le nombre de joueurs doit être supérieur à 0')
    .addValidator(description, 'La table doit contenir une description')

  const checkedPeriodButton: MdRadio | null = period.getCheckedRadioButton()
  if (checkedPeriodButton === null) {
    alert("Sélectionnez une période.");
  }

  if (fieldsValidator.validate() && checkedPeriodButton) {

    const from_date = new Date(sessionStore.current.from_date)
    const to_date = new Date(sessionStore.current.to_date)

    if (checkedPeriodButton.value === "soiree") {
      from_date.setHours(20, 0)
      to_date.setHours(23, 59)
    } else if (checkedPeriodButton.value === "apres-midi") {
      from_date.setHours(14, 0)
      to_date.setHours(18, 0)
    }

    const table = new TableModel(
      title.value,
      from_date,
      to_date,
      description.value,
      author,
      [],
      players.valueAsNumber,
    )

    emit('add-table', table);

    closeDialog(dialogRef.value)
  }
}

</script>

<template>
  <md-dialog ref="dialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">Ajout d'une nouvelle table</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" method="dialog">

      <p v-if="identity !== null">Ajouter une table en tant que <b>{{ identity.toString() }}</b></p>

      <span id="periode-label" class="label">Quand a lieu la table ?*</span>

      <div name="when-radio-group" class="when-radio-group" role="radiogroup" aria-labelledby="periode-label">
        <span class="radio-and-label">
          <label for="apres-midi">Après-midi</label>
          <md-radio id="apres-midi" name="periode" value="apres-midi" aria-label="Après-midi"></md-radio>
        </span>
        <span class="radio-and-label">
          <label for="soiree">Soirée</label>
          <md-radio id="soiree" name="periode" value="soiree" aria-label="Soirée"></md-radio>
        </span>
      </div>

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
      <md-text-button @click="validateTable">Ajouter la table</md-text-button>
    </div>
  </md-dialog>
</template>

<style scoped>
.radio-and-label {
  margin-right: 1em;
}

.radio-and-label>label {
  margin-right: 0.25em;
}

form {
  display: grid;
  grid-row: 2;
  gap: 1em;
}
</style>
