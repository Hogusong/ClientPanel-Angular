export interface Client {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  balance?: number;
}

export interface Settings {
  allowRegistration?: boolean,
  disableBalanceOnAdd?: boolean,
  disableBalanceOnEdit?: boolean,
  showBalanceUpdate?: boolean
}
