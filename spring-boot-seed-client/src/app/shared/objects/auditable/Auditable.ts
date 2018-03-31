import {ValidationResponse} from '../ValidationResponse';

export class Auditable {
  private _id = '';
  private _name = '';
  private _createdDate = 0;
  private _createdBy = '';
  private _updatedDate = 0;
  private _updatedBy = '';

  public static Validate(i: Auditable): ValidationResponse {
    if (i == null) {
      return new ValidationResponse(false, '', 'Auditable is null');
    }

    if (i._id == null || i._id === '') {
      return new ValidationResponse(false, 'id', 'Auditable id is null or empty');
    }

    if (i._name == null || i._name === '') {
      return new ValidationResponse(false, 'name', 'Auditable name is null or empty');
    }

    if (i._createdDate == null) {
      return new ValidationResponse(false, 'createdDate', 'Auditable createdDate is null');
    }

    if (i._createdBy == null || i._createdBy === '') {
      return new ValidationResponse(false, 'createdBy', 'Auditable createdBy is null or empty');
    }

    if (i._updatedDate == null) {
      return new ValidationResponse(false, 'updatedDate', 'Auditable updatedDate is null');
    }

    if (i._updatedBy == null || i._updatedBy === '') {
      return new ValidationResponse(false, 'updatedBy', 'Auditable updatedBy is null or empty');
    }

    return new ValidationResponse(true, '', '');
  }

  constructor(i: any = {}) {
    Object.assign(this, i);
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get createdDate(): number {
    return this._createdDate;
  }

  set createdDate(value: number) {
    this._createdDate = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get updatedDate(): number {
    return this._updatedDate;
  }

  set updatedDate(value: number) {
    this._updatedDate = value;
  }

  get updatedBy(): string {
    return this._updatedBy;
  }

  set updatedBy(value: string) {
    this._updatedBy = value;
  }
}
