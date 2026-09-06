import Enttiy from '../../../../shared/entities/entitiy.js';
import FullName from '../../../../shared/entities/fullName.js';
import Phone from '../../../../shared/entities/phone.js';

export interface AuthUserProps {
  id: string;
  name: FullName;
  phone: Phone;
  isActive: Boolean;
  createdAt: Date;
  updateAt: Date;
}

export class AuthUser extends Enttiy {
  constructor(private readonly props: AuthUserProps) {
    super(props.id, props.createdAt, props.updateAt);
  }
  getPhone() {
    return this.props.phone.toString();
  }
  getIsACtive() {
    return this.props.isActive;
  }
  getName() {
    return this.props.name.toString();
  }
}
