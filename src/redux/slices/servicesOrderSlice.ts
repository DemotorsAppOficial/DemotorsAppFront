import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServicesOrderFormState {
    attentionTo: string;
    serviceOrder: string;
    active: boolean;
}

const initialState: ServicesOrderFormState = {
    attentionTo: '',
    serviceOrder: '',
    active: false
}

const servicesOrderSlice = createSlice({
    name: 'servicesOrderForm',
    initialState,
    reducers: {
        setAttentionTo: (state, action: PayloadAction<string>) => {
            state.attentionTo = action.payload
        },
        setServiceOrder: (state, action: PayloadAction<string>) => {
            state.serviceOrder = action.payload
            state.active = true
        }
    }
})

export const { setAttentionTo, setServiceOrder } = servicesOrderSlice.actions
export default servicesOrderSlice.reducer