import { identifier } from "./identifier";

class Member {
  id: string;
  pseudo: string;
  name: string;

  constructor(pseudo: string, name: string, id: string | undefined | null = undefined) {
    this.id = identifier(id);
    this.pseudo = pseudo;
    this.name = name;
  }

  toString(): string {
    return `${this.pseudo} [${this.name}]`
  }
}

export { Member };
