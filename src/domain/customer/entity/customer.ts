import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import EnviaConsoleLogHandler from "../event/handler/send-log-when-customer-is-created.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  public eventDispatcher = new EventDispatcher();
  public eventHandler = new EnviaConsoleLogHandler();

  constructor(id: string, name: string ) {
    this._id = id;
    this._name = name;
    this.eventDispatcher.register("CustomerChangedAddressEvent", this.eventHandler);
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      name: this._name,
      id: this._id,
      newAddress: this._address
    });
    this.eventDispatcher.notify(customerChangedAddressEvent)
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
