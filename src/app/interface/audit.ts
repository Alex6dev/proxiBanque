import { Account } from "./account";

export interface Audit {
    numberOfAccounts: number;
    numberOfOverdrawnAccounts: number;
    totalOverdraft: number;
    overdrawnAccounts: Array<Account>;
}