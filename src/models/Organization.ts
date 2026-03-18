// Interface representing an Organization entity
export interface Organization {
  _id: string;
  name: string;
  address?: string; // Optional address field
  description?: string; // Optional description
}
