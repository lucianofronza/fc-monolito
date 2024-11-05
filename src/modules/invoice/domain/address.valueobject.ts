import ValueObject from "../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };

export class Address implements ValueObject {
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;
  
  constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
  }
    
  get street() {
    return this._street;
  }
  
  get number() {
    return this._number;
  }
  
  get complement() {
    return this._complement;
  }
  
  get city() {
    return this._city;
  }
  
  get state() {
    return this._state;
  }
  
  get zipCode() {
    return this._zipCode;
  }
}