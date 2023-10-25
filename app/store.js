// Zustand store.js
import {create} from 'zustand';

export const useFormulaStore = create((set) => ({
  formulas: [{ id: 1, name: '' }],
  addFormula: () => set((state) => ({ formulas: [...state.formulas, { id: state.formulas.length + 1, name: '' }] })),
  updateFormulaName: (index, name) => set((state) => {
    const updatedFormulas = [...state.formulas];
    updatedFormulas[index].name = name;
    return { formulas: updatedFormulas };
  }),
}));
