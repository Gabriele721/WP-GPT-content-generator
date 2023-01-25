export class MessageClass {
  private type: string;
  private message: string;

  constructor(type: string, message: string ) {
    this.type = type;
    this.message = message;
  }

  getType(): string {
    return this.type;
  }

  getMessage() {
    return this.message;
  }
}
