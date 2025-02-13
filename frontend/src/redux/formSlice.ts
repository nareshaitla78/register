import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  photo: string | null;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+91",
  address: "",
  photo: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof FormState; value: any }>) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
