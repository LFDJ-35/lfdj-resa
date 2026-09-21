import type { TextField } from '@material/web/textfield/internal/text-field'

/**
 * Permet de trouver récursivement un élément DOM par son attribut `name`.
 * @param element Élément dont les enfants sont à vérifier
 * @param to_find Valeur de l'attribut `name` à trouver
 * @param max_depth Profondeur maximale de traversée
 * @returns null Aucun élément trouvé
 * @returns Element Le premier élément dont le nom correspond.
 */
function findRecursiveNamedItem(
  element: Element,
  to_find: string,
  max_depth: number = 5,
): Element | null {
  if (max_depth <= 0) {
    return null
  }

  let found = element.children.namedItem(to_find)

  if (found === null) {
    for (const child of element.children) {
      found = findRecursiveNamedItem(child, to_find, max_depth - 1)
      if (found !== null) {
        return found
      }
    }
  }

  return found
}

function checkMdOutlinedTextFieldValidity(
  field: TextField,
  errorMsg: string = 'Champ invalide',
): boolean {
  if (!field.checkValidity()) {
    field.error = true
    field.errorText = errorMsg
    return false
  }

  field.error = false
  field.errorText = ''
  return true
}

type textFieldValidationFunction = (field: TextField, errorMsg: string) => boolean

class FieldsValidator {
  validators: Array<[TextField, string, textFieldValidationFunction]> = []

  constructor() { }

  addValidator(
    field: TextField,
    errorMsg: string,
    validationFunction: textFieldValidationFunction = checkMdOutlinedTextFieldValidity,
  ): FieldsValidator {
    this.validators.push([field, errorMsg, validationFunction])
    return this
  }

  validate(): boolean {
    let noValidationError = true

    for (const validator of this.validators) {
      noValidationError = validator[2](validator[0], validator[1]) && noValidationError
    }

    return noValidationError
  }
}

export { findRecursiveNamedItem, checkMdOutlinedTextFieldValidity, FieldsValidator }
