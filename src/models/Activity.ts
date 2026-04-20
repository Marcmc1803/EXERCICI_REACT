export type ActivityAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type ActivityEntityType = 'USER' | 'ORGANIZATION';

export interface Activity {
  _id?: string;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: string;
  description: string;
  timestamp?: string;
  createdAt?: string;
}
