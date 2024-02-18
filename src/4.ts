import {v4 as uuidv4} from 'uuid';

class Key {
  private signature: string;

  constructor() {
    this.signature = this.generateSignature();
  }

  getSignature(): string {
    return this.signature;
  }

  private generateSignature(): string {
    return uuidv4();
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected lock: Key;
  protected tenants: Person[];

  constructor(key: Key) {
    this.door = false;
    this.lock = key;
    this.tenants = [];
  }

  comeIn(newTenant: Person) {
    if (this.door) {
      this.tenants.push(newTenant);
      console.log("The door is opened and you come in. Registering new visitor. Thank you for visiting us.");
      this.door = false;
      console.log("The doors in this universe close right behind the visitor. Door is locked again. Vaiting for the next visitor.");
    } else {
      console.log("Door is locked. Sorry, but you can't come in. Please use your key to open the door.");
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
      if (this.lock === key) {
        console.log("Your key is valid and door is opened.");
        this.door = true;
      } else {
        console.log("Sorry, but your key is not valid. Door can't be opened.");
      }
  }
}


const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.comeIn(person);                   // Door is locked. Sorry, but you can't come in. Please use your key to open the door.
house.openDoor(person.getKey());        // Your key is valid and door is opened.
house.comeIn(person);                   // The door is opened and you come in. Registering new visitor. Thank you for visiting us.

const otherKey = new Key();
const stranger = new Person(otherKey);

house.openDoor(stranger.getKey());      // Sorry, but your key is not valid. Door can't be opened.
house.comeIn(stranger);                 // Door is locked. Sorry, but you can't come in. Please use your key to open the door.

export {};
