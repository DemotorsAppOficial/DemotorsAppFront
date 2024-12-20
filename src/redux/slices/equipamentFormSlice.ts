import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EquipamentFormState {
    motor: string;
    marca: string;
    modelo: string;
    idSerie: number;
    serie: string;
    especificaciones: string;
}

const initialState: EquipamentFormState = {
    motor: '',
    marca: '',
    modelo: '',
    idSerie: 0,
    serie: '',
    especificaciones: ''
};

const equipamentFormSlice = createSlice({
    name: 'equipamentForm',
    initialState,
    reducers: {
        setMotor(state, action: PayloadAction<string>) {
            state.motor = action.payload;
        },
        setMarca(state, action: PayloadAction<string>) {
            state.marca = action.payload;
        },
        setModelo(state, action: PayloadAction<string>) {
            state.modelo = action.payload;
        },
        setIdSerie(state, action: PayloadAction<number>) {
            state.idSerie = action.payload;
        },
        setSerie(state, action: PayloadAction<string>) {
            state.serie = action.payload;
        },
        setEspecificaciones(state, action: PayloadAction<string>) {
            state.especificaciones = action.payload;
        }
    }
});

export const { setMotor, setMarca, setModelo, setIdSerie, setSerie, setEspecificaciones } = equipamentFormSlice.actions;

export default equipamentFormSlice.reducer;
