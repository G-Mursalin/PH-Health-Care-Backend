export interface IPaymentData {
  amount: number;
  transactionId: string;
  name: string;
  email: string;
  address: string | null;
  contactNumber: string | null;
}
