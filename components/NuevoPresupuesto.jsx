import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import globalStyles from "../styles";
import { useBudgeStore } from "../store/budgeStore";
import useBudge from "../hooks/useBudge";

const NuevoPresupuesto = () => {
  const presupuesto = useBudgeStore((state) => state.presupuesto);
  const updatePresupuesto = useBudgeStore((state) => state.updatePresupuesto);
  const { handleNuevoPresupuesto } = useBudge();
  console.log(presupuesto);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={(text) => updatePresupuesto(text)}
      />

      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto)}
      >
        <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    color: "#3B82F6",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: "#1048A4",
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default NuevoPresupuesto;
