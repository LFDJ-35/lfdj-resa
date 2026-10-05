<script setup lang="ts">
import { closeDialog } from '@/utils/dialogs'
import type { MdDialog } from '@material/web/all'
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  accept: { type: String, required: true },
  refuse: { type: String, required: true },
  emphasis: { type: String },
  question: { type: String },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'accepted'): void
  (e: 'refused'): void
}>()

const thisDialog = ref<MdDialog | null>(null)

defineExpose({ thisDialog })
</script>

<template>
  <md-dialog ref="thisDialog">
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <h2 slot="headline" class="dialog-headline">{{ props.title }}</h2>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <form name="content" slot="content" method="dialog">
      <p v-if="props.emphasis !== null">
        <b>{{ props.emphasis }}</b>
      </p>
      <p v-if="props.question !== null">
        <b>{{ props.question }}</b>
      </p>
    </form>

    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="actions">
      <md-text-button
        @click="
          () => {
            closeDialog(thisDialog)
            $emit('refused')
          }
        "
        >{{ refuse }}</md-text-button
      >
      <md-text-button
        @click="
          () => {
            closeDialog(thisDialog)
            $emit('accepted')
          }
        "
        >{{ accept }}</md-text-button
      >
    </div>
  </md-dialog>
</template>

<style lang="css" scoped>
.dialog-headline {
  font-size: x-large;
}

@media (max-width: 800px) {
  .dialog-headline {
    font-size: larger;
  }
}
</style>
