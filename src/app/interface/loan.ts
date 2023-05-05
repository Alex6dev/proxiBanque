export interface Loan {
    id:number,
    initialAmount:number,
    remainingAmount:number,
    startOfLoan: Date|null,
    duration:number,
    interestRate:number,
    insuranceRate:number,
    accept:Boolean
}

export interface AcceptLoanDto{
    loan:Loan,
    idClient:number
}
