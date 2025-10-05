export interface Customer {
  id: string;
  name: string;
  email: string;
  isVIP: boolean;
  createdAt: Date;
  registeredDate: Date;
  loyaltyPoints: number;
}
