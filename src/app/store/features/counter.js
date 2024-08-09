import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    income: [],  // income
    expanse: [], //expanse 
    customIcon:
    {
        income: [],  // customicon income
        expanse: []  // customicon expanse
    },
    singalIcon: [],  // singal icon page data
    status: 'idle',
    error: null,
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await fetch('http://localhost:5000/api/items');
    return response.json();
});

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {

        // ...................................................................... income
        addIncome: (state, action) => {
            state.income.push(action.payload);
        },
        updateIncome: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.income.findIndex(item => item.id === id);
            console.log("🚀 ~ index:", index)
            if (index !== -1) {
                state.income[index] = { ...state.income[index], ...updatedData };
            }
        },
        deleteIncome: (state, action) => {
            state.income = state.income.filter(item => item.id !== action.payload);
        },

        // ..............................................................expanse.............................................................

        addExpanse: (state, action) => {
            state.expanse.push(action.payload)
        },
        updateExpanse: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.expanse.findIndex(item => item.id === id);
            if (index !== -1) {
                state.expanse[index] = { ...state.expanse[index], ...updatedData };
            }
        },
        deleteExpanse: (state, action) => {
            state.expanse = state.expanse.filter(item => item.id !== action.payload);
        },

        // ......................................................customIcon. income......................................................

        addcustomIconincome: (state, action) => {
            state.customIcon.income.push(action.payload)
        },
        updatecustomIconincome: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.customIcon.income.findIndex(item => item.id === id);
            if (index !== -1) {
                state.customIcon.income[index] = { ...state.customIcon.income[index], ...updatedData };
            }
        },
        deletecustomIconincome: (state, action) => {
            state.customIcon.income = state.customIcon.income.filter(item => item.id !== action.payload);
        },


        // ..............................................customIcon. expanse.............................................................

        addcustomIconexpnse: (state, action) => {
            state.customIcon.expanse.push(action.payload)
        },
        updatecustomIconexpnse: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.customIcon.expanse.findIndex(item => item.id === id);
            if (index !== -1) {
                state.customIcon.expanse[index] = { ...state.customIcon.expanse[index], ...updatedData };
            }
        },
        deletecustomIconexpnse: (state, action) => {
            state.customIcon.expanse = state.customIcon.expanse.filter(item => item.id !== action.payload);
        },


        // ...............................singalIcon............................................

        addsingleIcon: (state, action) => {
            state.singalIcon.push(action.payload)
        },
        updatesingleIcon: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.singalIcon.findIndex(item => item.id === id);
            if (index !== -1) {
                state.customIcon.expanse[index] = { ...state.customIcon.expanse[index], ...updatedData };
            }
        },
        deletesingleIcon: (state, action) => {
            state.singalIcon = state.singalIcon.filter(item => item.id !== action.payload);
        },
        incrementQlysingIcon: (state, action) => {
            const { id, qly } = action.payload; // Expecting { id: number, amount: number }
            const icon = state.singalIcon.find(item => item.id === id);
            if (icon) {
                icon.qly += qly;
            }
        },
        decrementQlysingIcon: (state, action) => {
            const { id, qly } = action.payload; // Expecting { id: number, amount: number }
            const icon = state.singalIcon.find(item => item.id === id);
            if (icon && icon.qly > 0) {
                icon.qly -= qly;
            }
        },




    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {
    addIncome,
    updateIncome,
    deleteIncome,
    addExpanse,
    updateExpanse,
    deleteExpanse,
    addcustomIconincome,
    updatecustomIconincome,
    deletecustomIconincome,
    addcustomIconexpnse,
    updatecustomIconexpnse,
    deletecustomIconexpnse,
    addsingleIcon,
    updatesingleIcon,
    deletesingleIcon,
    incrementQlysingIcon,
    decrementQlysingIcon
} = itemsSlice.actions;

export default itemsSlice.reducer;