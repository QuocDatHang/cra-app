import React from "react";
import { useReducer } from "react";

const initState = {
    balance: 0,
    amount: 0
}

//action creator
const inputAmount = (payload) => {
    return {
        type: 'bank/inputAmount',
        payload: payload
    }
}
const deposit = () => {
    return {
        type: 'bank/deposit',
    }
}

const withdraw = () => {
    return {
        type: 'bank/withdraw',
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'bank/deposit':
            return {
                ...state,
                balance: state.balance + state.amount,
                amount: 0
            }
        case 'bank/withdraw':
            return {
                ...state,
                balance: state.balance - state.amount,
                amount: 0
            }
        case 'bank/inputAmount':
            return {
                ...state,
                amount: action.payload
            }
        default:
            return state;
    }
}
export default function BankingApp() {
    const [state, dispatch] = useReducer(reducer, initState)
    console.log(state);

    const handleInputAmount = (e) => {
        dispatch(inputAmount(Number(e.target.value)))
    }

    const handleDeposit = () => {
        dispatch(deposit())
    }

    const handleWithdraw = () => {
        dispatch(withdraw())
    }
    return (
        <>
            <div className="container">
                <h3>ATM</h3>
                <div>Balance: {state.balance} USD </div>
                <label>Amount</label>
                <input type="number" className="form-control w-25" onInput={handleInputAmount} value={state.amount} />
                <div className="d-flex my-2">
                    <button type="button" className="btn btn-success me-2" onClick={handleDeposit}>Deposit</button>
                    <button type="button" className="btn btn-warning" onClick={handleWithdraw}>Withdraw</button>
                </div>
            </div>
        </>
    )
}