import { useEffect } from "react";
import { Button, Image, Modal, Pressable } from "react-native";
import { StyleSheet, ScrollView, View } from "react-native";
import Header from "./components/Header";
import ControlPresupuesto from "./components/ControlPresupuesto";
import NuevoPresupuesto from "./components/NuevoPresupuesto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Filtro from "./components/Filtro";
import ListadoGastos from "./components/ListadoGastos";
import FormularioGasto from "./components/FormularioGasto";
import { useBudgeStore } from "./store/budgeStore";

export default function App() {
  const presupuesto = useBudgeStore((state) => state.presupuesto);
  const updatePresupuesto = useBudgeStore((state) => state.updatePresupuesto);
  const isValidPresupuesto = useBudgeStore((state) => state.isValidPresupuesto);
  const gastos = useBudgeStore((state) => state.gastos);
  const updateGastos = useBudgeStore((state) => state.updateGastos);
  const updateValidPresupuesto = useBudgeStore(
    (state) => state.updateValidPresupuesto
  );
  const stateModal = useBudgeStore((state) => state.stateModal);
  const modal = useBudgeStore((state) => state.modal);
  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem("planificador_presupuesto")) ?? 0;

        if (presupuestoStorage > 0) {
          updatePresupuesto(presupuestoStorage);
          updateValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem("planificador_presupuesto", presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem("planificador_gastos");

        updateGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          "planificador_gastos",
          JSON.stringify(gastos)
        );
      } catch (error) {
        console.log(error);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? <ControlPresupuesto /> : <NuevoPresupuesto />}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro />
            <ListadoGastos />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            stateModal(!modal);
          }}
        >
          <FormularioGasto />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => stateModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require("./assets/img/nuevo-gasto.png")}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#3B82F6",
    minHeight: 400,
  },
  pressable: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});
