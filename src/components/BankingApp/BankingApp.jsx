import React from "react";
import { useReducer } from "react";

export default function BankingApp() {
    const initState = {
        balance: 0,
        amount: 0
    }

    const deposit = {
        
    }

    return (
        <>
            <div className="container">
                <h3>ATM</h3>
                <div>Balance: </div>
                <label>Amount</label>
                <input type="number" className="form-control w-25" />
                <div className="d-flex my-2">
                <button type="button" className="btn btn-success me-2">Deposit</button>
                <button type="button" className="btn btn-warning">Withdraw</button>
                </div>
            </div>
        </>
    )
}