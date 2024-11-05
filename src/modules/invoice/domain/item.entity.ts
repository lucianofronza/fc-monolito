import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ItemProps = {
    id: Id;
    name: string;
    price: number;
  };
  
  export class ItemEntity extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;
  
    constructor(props: ItemProps) {
      super(props.id);
      this._name = props.name;
      this._price = props.price;
    }
  
    get name() {
      return this._name;
    }
  
    get price() {
      return this._price;
    }
  }