import { v4 } from 'uuid'

/**
 * Permet de récupérer un identifiant.
 * @param id Identifiant optionnel à renseigner.
 * @returns uuid v4 si id est non défini ou null. id sinon.
 */
function identifier(id: string | null | undefined): string {
  if (id === null || id === undefined) {
    return v4()
  }
  return id
}

export { identifier }
