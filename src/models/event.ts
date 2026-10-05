import { identifier } from "@/models/identifier";

/**
 * Représente une session de jeu
 */
class SessionEvent {
  title: string;
  from_date: Date;
  to_date: Date;
  description: string;
  id: string;

  /**
   * Constructeur d'une session de jeu
   * @param title Titre de l'évènement / de la session
   * @param from_date Date de début de l'évènement
   * @param to_date Date de fin de l'évènement
   * @param description Description de l'évènement
   */
  constructor(title: string, from_date: Date, to_date: Date, description: string, id: string | undefined = undefined) {
    this.id = identifier(id);
    this.title = title;
    this.from_date = from_date;
    this.to_date = to_date;
    this.description = description;
  }
}

export { SessionEvent };
