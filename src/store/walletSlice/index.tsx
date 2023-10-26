// walletSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
    usd: number;
    eur: number;
    gbp: number;
}

const initialState: WalletState = {
    usd: 1000,
    eur: 2000,
    gbp: 3000,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<{ currency: string; amount: number }>) => {
            const { currency, amount } = action.payload;
            if (currency in state) {
                state[currency] = amount;
            }
        },
        addBalance: (state, action: PayloadAction<{ currency: string; amount: number }>) => {
            const { currency, amount } = action.payload;
            if (currency in state) {
                state[currency] += amount;
            }
        },
        reduceBalance: (state, action: PayloadAction<{ currency: string; amount: number }>) => {
            const { currency, amount } = action.payload;
            if (currency in state) {
                state[currency] -= amount;
            }
        },
    },
});

export const { setBalance, addBalance, reduceBalance } = walletSlice.actions;
export default walletSlice.reducer;
