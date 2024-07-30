import { create } from "zustand";

export const useBudgeStore = create((set) => ({
  presupuesto: 0,
  disponible: 0,
  isValidPresupuesto: false,
  gastos: [],
  gasto: {},
  filtro: "",
  modal: false,
  gastosFiltrados: [],
  updatePresupuesto: (newPresupuesto) => set({ presupuesto: newPresupuesto }),
  updateDisponible: (newDisponible) => set({ disponible: newDisponible }),
  updateValidPresupuesto: (valid) => set({ isValidPresupuesto: valid }),
  updateGastos: (gasto) => set({ gastos: gasto }),
  updateGasto: (gasto) => set({ gasto: gasto }),
  gastosFiltro: (filtro) => set({ filtro: filtro }),
  updateGastosFiltrados: (filtrados) => set({ gastosFiltrados: filtrados }),
  stateModal: (state) => set({ modal: state }),
}));
