<script setup lang="ts">

import '@material/web/icon/icon'

import { closeDialog, openDialog } from '@/utils/dialogs'
import { MdChipSet, MdDialog, MdOutlinedTextField, MdRadio } from '@material/web/all'
import { ref } from 'vue'

import { FAKE_CARPOOLS } from '@/data/carpool_drivers'
import { Carpool, type CarpoolWhen, type ICarpool } from '@/models/carpool'
import { Member } from '@/models/member'
import { identity } from '@/stores/identity'
import { FieldsValidator, findRecursiveNamedItem, MdRadioGroup } from '@/utils/forms'
import YesNoDialog from './dialogs/YesNoDialog.vue'

const location = 'VITRÉ'
const LABEL_ADD_DRIVER = 'Proposer sa voiture'

const addCarpoolDriverDialogRef = ref<MdDialog | null>(null)
const addCarpoolPassengerDialogRef = ref<{ thisDialog: MdDialog } | null>(null)
const removeCarpoolDriverDialogRef = ref<{ thisDialog: MdDialog } | null>(null)
const removeCarpoolPassengerDialogRef = ref<{ thisDialog: MdDialog } | null>(null)

const targetPassenger = ref<Member | null>(null)
const targetCarpool = ref<ICarpool | null>(null)

function openRemovePassengerFromCarpoolDialog(carpool: ICarpool, passenger: Member) {
  if (removeCarpoolPassengerDialogRef.value === null) { return }

  targetCarpool.value = carpool
  targetPassenger.value = passenger

  openDialog(removeCarpoolPassengerDialogRef.value.thisDialog)
}

function openAddPassengerToCarpoolDialog(carpool: ICarpool) {
  if (addCarpoolPassengerDialogRef.value === null) { return }

  targetCarpool.value = carpool

  openDialog(addCarpoolPassengerDialogRef.value.thisDialog)
}

function openRemoveCarpoolDriverDialog(carpool: ICarpool) {
  if (removeCarpoolDriverDialogRef.value === null) {
    return
  }
  targetCarpool.value = carpool
  openDialog(removeCarpoolDriverDialogRef.value.thisDialog);
}

class CarpoolControl {
  static addCarpoolDriver(): void {
    if (addCarpoolDriverDialogRef.value === null || identity.value === null) {
      return
    }

    const maxPassengers = findRecursiveNamedItem(
      addCarpoolDriverDialogRef.value,
      'places',
    ) as MdOutlinedTextField
    const where = findRecursiveNamedItem(
      addCarpoolDriverDialogRef.value,
      'depart',
    ) as MdOutlinedTextField

    const noValidationError = new FieldsValidator()
      .addValidator(maxPassengers, 'Le nombre de passagers doit être compris entre 1 et 8')
      .addValidator(where, 'La destination doit contenir au moins un caractère')
      .validate()

    if (noValidationError === false) {
      return
    }

    const groupWhen = findRecursiveNamedItem(
      addCarpoolDriverDialogRef.value,
      'radio-group',
    ) as Element
    const whenRadioButtons = new MdRadioGroup(groupWhen)
    const checkedRadio = whenRadioButtons.getCheckedRadioButton()
    if (checkedRadio === null) {
      alert('Merci de sélectionner une période de covoiturage')
      return
    }

    CARPOOLS.value.push(
      new Carpool(
        identity.value,
        where.value,
        checkedRadio.value as CarpoolWhen,
        [],
        maxPassengers.valueAsNumber,
      ),
    )

    closeDialog(addCarpoolDriverDialogRef.value)
  }

  static removeCarpool(): void {
    if (removeCarpoolDriverDialogRef.value === null) { return }

    if (targetCarpool.value !== null) {
      const carpoolIdx = CARPOOLS.value.findIndex((val, _idx, _arr) => val.id === targetCarpool.value!.id)
      if (carpoolIdx !== -1) {
        CARPOOLS.value.splice(carpoolIdx, 1)
      }
    }
    targetCarpool.value = null;
  }
}

/**
 * Classe permettant de contrôler passagers d'un covoiturage
 */
class PassengersControl {
  /**
   * Supprime un passager d'un covoiturage
   */
  static removePassengerFromCarpool() {
    if (targetCarpool.value === null) { return }

    targetCarpool.value.removePassenger(targetPassenger.value)
    targetCarpool.value = null
    targetPassenger.value = null
  }

  static addPassengerToCarpool() {
    if (targetCarpool.value === null) { return }
    targetCarpool.value.addPassenger(identity.value)
    targetCarpool.value = null
  }
}

const CARPOOLS = ref(FAKE_CARPOOLS)

function isMemberInCarpools(member: Member): boolean {
  return CARPOOLS.value
    .map((pool) => pool.has(member))
    .some((val) => val === true)
}

/**
 * Fonction permettant de vérifier si la personne peut s'inscrire au covoiturage en tant que conducteur
 */
function canSubscribeToDrivers(): boolean {
  return identity.value !== null && !isMemberInCarpools(identity.value)
}

function showAvailablePassengerSlot(carpool: ICarpool): boolean {
  if (identity.value === null || carpool.canAddPassenger() === false) { return false }

  return !isMemberInCarpools(identity.value);
}

function identityIsDriver(carpool: ICarpool): boolean {
  if (identity.value === null) return false;
  return identity.value.id === carpool.driver.id
}
</script>

<template>
  <h2>Covoiturage vers {{ location }}</h2>

  <section class="card-section">
    <div v-for="carpool in CARPOOLS" :key="carpool.driver.id" class="card">
      <md-chip-set>
        <md-assist-chip aria-label="Places disponibles" title="Places disponibles">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="icon">group</md-icon>
          <span>{{ carpool.passengers.length }}/{{ carpool.max_passengers }}</span>
        </md-assist-chip>
        <md-assist-chip aria-label="Départ" title="Départ">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="icon">pin_drop</md-icon>
          <span>{{ carpool.from }}</span>
        </md-assist-chip>
        <md-assist-chip aria-label="Départ le" title="Départ le">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="icon">departure_board</md-icon>
          <span>{{ carpool.when }}</span>
        </md-assist-chip>
      </md-chip-set>
      <br />
      <md-list>
        <md-list-item>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <div slot="headline">{{ carpool.driver.toString() }}</div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon v-if="identityIsDriver(carpool)" class="clickable" slot="end"
            @click="openRemoveCarpoolDriverDialog(carpool)">delete</md-icon>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon v-else slot="end">search_hands_free</md-icon>

        </md-list-item>
        <md-list-item v-for="passenger in carpool.passengers" :key="passenger.id">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <div slot="headline">{{ passenger.toString() }}</div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="end" class="clickable" @click="
            () => {
              openRemovePassengerFromCarpoolDialog(carpool, passenger)
            }
          ">person_remove</md-icon>
        </md-list-item>

        <md-list-item v-if="showAvailablePassengerSlot(carpool)" @click="() => openAddPassengerToCarpoolDialog(carpool)"
          class="clickable" title="Cliquez pour s'inscrire au covoiturage"
          aria-label="Cliquez pour s'inscrire au covoiturage">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <div slot="headline">Disponible</div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <md-icon slot="end" class="clickable">person_add</md-icon>
        </md-list-item>
      </md-list>
    </div>

    <div v-if="canSubscribeToDrivers()" class="add-element-box" :aria-label="LABEL_ADD_DRIVER" :title="LABEL_ADD_DRIVER"
      @click="() => openDialog(addCarpoolDriverDialogRef)">
      <md-icon>add</md-icon>
      <p>Je propose ma voiture !</p>
    </div>
  </section>

  <md-dialog ref="addCarpoolDriverDialogRef">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">S'inscrire en tant que conducteur</h2>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" method="dialog">
      <p>Combien ?</p>
      <md-outlined-text-field required name="places" label="Nombre de passagers" type="number" min="1" max="8"
        value="3"></md-outlined-text-field>
      <p>Où ?</p>
      <md-outlined-text-field required name="depart" label="Lieu de départ" pattern=".+"></md-outlined-text-field>
      <p>Quand ?</p>
      <div name="radio-group" class="radio-group" role="radiogroup" aria-labelledby="periode">
        <span class="radio-and-label">
          <label for="Après-midi">Après-midi</label>
          <md-radio name="periode" value="Après-midi" aria-label="Après-midi"></md-radio>
        </span>
        <span class="radio-and-label">
          <label for="Soirée">Soirée</label>
          <md-radio name="periode" value="Soirée" aria-label="Soirée"></md-radio>
        </span>
      </div>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button @click="() => closeDialog(addCarpoolDriverDialogRef)">Annuler</md-text-button>
      <md-text-button @click="CarpoolControl.addCarpoolDriver">Confirmer l'inscription</md-text-button>
    </div>
  </md-dialog>

  <YesNoDialog ref="addCarpoolPassengerDialogRef" title="Inscription au covoiturage"
    :emphasis="'S\'inscrire en tant que ' + identity?.toString() + ' ?'" accept="Confirmer l'inscription"
    refuse="Annuler" @accepted="PassengersControl.addPassengerToCarpool">
  </YesNoDialog>

  <YesNoDialog ref="removeCarpoolPassengerDialogRef" title="Désinscrire le passager"
    :emphasis="'Désinscrire le passager ' + targetPassenger?.toString() + ' ?'" accept="Confirmer la désinscription"
    refuse="Annuler" @accepted="PassengersControl.removePassengerFromCarpool">
  </YesNoDialog>

  <YesNoDialog ref="removeCarpoolDriverDialogRef" title="Supprimer votre covoiturage ?"
    emphasis="Merci de prévenir vos passagers." accept="Confirmer la suppression" refuse="Annuler"
    @accepted="CarpoolControl.removeCarpool"></YesNoDialog>

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.radio-group {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

.radio-and-label {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}
</style>
