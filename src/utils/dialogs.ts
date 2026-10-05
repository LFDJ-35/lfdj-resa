import { MdDialog } from '@material/web/all'

function openDialog(dialog: MdDialog | undefined | null) {
  if (dialog === null || dialog === undefined) return

  dialog.show()
}

function closeDialog(dialog: MdDialog | null) {
  if (dialog === null) {
    return
  }
  dialog.close()
}

interface YesNoDialogRef {
  thisDialog: MdDialog
}

export { openDialog, closeDialog, type YesNoDialogRef }
