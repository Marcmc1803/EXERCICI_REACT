// Interface representing a User entity
import { Organization } from './Organization';

export interface User {
  _id: string;
  name: string;
  email: string;
  organizacion: Organization | string; // Reference to Organization, can be ID or full object
  password?: string; // Optional, used for creation/updates
}
