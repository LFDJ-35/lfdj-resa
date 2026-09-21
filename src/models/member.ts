import { v4 as uuidv4 } from "uuid";

class Member {
  id: string;
  pseudo: string;
  name: string;

  constructor(pseudo: string, name: string, id: string | undefined | null = undefined) {
    if (id === undefined || id === null) {
      this.id = uuidv4();
    }
    else {
      this.id = id;
    }
    this.pseudo = pseudo;
    this.name = name;
  }

  toString(): string {
    return `${this.pseudo} [${this.name}]`
  }
}

export { Member };
