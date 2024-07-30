import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Gasto from "./Gasto";
import { useBudgeStore } from "../store/budgeStore";
const ListadoGastos = () => {
  const gastos = useBudgeStore((state) => state.gastos);
  const filtro = useBudgeStore((state) => state.filtro);
  const gastosFiltrados = useBudgeStore((state) => state.gastosFiltrados);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>
      {filtro
        ? gastosFiltrados.map((gasto) => <Gasto key={gasto.id} gasto={gasto} />)
        : gastos.map((gasto) => <Gasto key={gasto.id} gasto={gasto} />)}

      {(gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={styles.noGastos}>No Hay Gastos</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: "#64748B",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default ListadoGastos;
