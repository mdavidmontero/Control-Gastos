import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { formatearCantidad } from "../utils";
import globalStyles from "../styles";
import CircularProgress from "react-native-circular-progress-indicator";
import { useBudgeStore } from "../store/budgeStore";
import useBudge from "../hooks/useBudge";

export default function ControlPresupuesto() {
  const presupuesto = useBudgeStore((state) => state.presupuesto);
  const gastos = useBudgeStore((state) => state.gastos);
  const disponible = useBudgeStore((state) => state.disponible);
  const updateDisponible = useBudgeStore((state) => state.updateDisponible);
  const { resetearApp } = useBudge();
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
    setGastado(totalGastado);
    updateDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          radius={150}
          valueSuffix={"%"}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          titleColor="#64748B"
        />
      </View>

      <View style={styles.contenedorTexto}>
        <Pressable onLongPress={resetearApp} style={styles.boton}>
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: {""} </Text>
          {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: {""}</Text>
          {formatearCantidad(disponible)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: {""}</Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#DB2777",
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "700",
    color: "#3B82F6",
  },
});
