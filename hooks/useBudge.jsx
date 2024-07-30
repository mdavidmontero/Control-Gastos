import { useBudgeStore } from "../store/budgeStore";
import { generarId } from "../utils";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useBudge() {
  const updateGastos = useBudgeStore((state) => state.updateGastos);
  const disponible = useBudgeStore((state) => state.disponible);
  const updateGasto = useBudgeStore((state) => state.updateGasto);
  const stateModal = useBudgeStore((state) => state.stateModal);
  const modal = useBudgeStore((state) => state.modal);
  const gastos = useBudgeStore((state) => state.gastos);
  const updateValidPresupuesto = useBudgeStore(
    (state) => state.updateValidPresupuesto
  );
  const updatePresupuesto = (state) => state.updatePresupuesto;

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      updateValidPresupuesto(true);
    } else {
      Alert.alert("Error", "El Presupuesto no puede ser 0 o menor");
    }
  };
  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    if (gasto.cantidad > disponible) {
      Alert.alert(
        "Error",
        "El valor del Gasto sobrepasa el presupuesto disponible",
        [{ text: "Ok", style: "cancel" }]
      );
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      updateGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      updateGastos([...gastos, gasto]);
    }
    stateModal(!modal);
  };

  const eliminarGasto = (id) => {
    Alert.alert(
      "¿Deseas eliminar este gasto?",
      "Un gasto eliminado no se puede recuperar",
      [
        { text: "No", style: "cancel" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            const gastosActualizados = gastos.filter(
              (gastoState) => gastoState.id !== id
            );

            updateGastos(gastosActualizados);
            stateModal(!modal);
            updateGasto({});
          },
        },
      ]
    );
  };

  const resetearApp = () => {
    Alert.alert(
      "Deseas resetear la app?",
      "Esto eliminará presupuesto y gastos",
      [
        { text: "No", style: "cancel" },
        {
          text: "Si, Eliminar",
          onPress: async () => {
            try {
              await AsyncStorage.clear();

              updateValidPresupuesto(false);
              updatePresupuesto(0);
              updateGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return {
    handleGasto,
    eliminarGasto,
    resetearApp,
    handleNuevoPresupuesto,
  };
}
