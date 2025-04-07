export interface Transaction {
    id: number;
    type: string;
    category: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
