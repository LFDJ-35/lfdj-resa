import { MdDialog } from "@material/web/all";

function openDialog(dialog: MdDialog | null) {
  if (dialog === null) return;

  dialog.show();
}

function closeDialog(dialog: MdDialog | null) {
  if (dialog === null) {
    return
  }
  dialog.close()
}

export { openDialog, closeDialog }
