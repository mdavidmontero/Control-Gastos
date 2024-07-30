import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import globalStyles from "../styles";
import { useBudgeStore } from "../store/budgeStore";

const Filtro = () => {
  const gastos = useBudgeStore((state) => state.gastos);
  const filtro = useBudgeStore((state) => state.filtro);
  const gastosFiltro = useBudgeStore((state) => state.gastosFiltro);
  const updateGastosFiltrados = useBudgeStore(
    (state) => state.updateGastosFiltrados
  );
  useEffect(() => {
    if (filtro === "") {
      updateGastosFiltrados([]);
    } else if (filtro === "todos") {
      const gastosFiltro = gastos.map((gasto) => gasto);
      updateGastosFiltrados(gastosFiltro);
    } else {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      console.log(gastosFiltrados);

      updateGastosFiltrados(gastosFiltrados);
    }
  }, [filtro, gastos]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar Gastos</Text>

      <Picker
        selectedValue={filtro}
        onValueChange={(valor) => {
          gastosFiltro(valor);
        }}
      >
        <Picker.Item label="-- Seleccione --" value="todos" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos Varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    transform: [{ translateY: 0 }],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: "900",
    color: "#64748B",
  },
});

export default Filtro;
