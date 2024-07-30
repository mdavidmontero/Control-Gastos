import { Text, StyleSheet, SafeAreaView, View } from "react-native";

const Header = () => {
  return (
    <View>
      <SafeAreaView>
        <Text style={styles.texto}>Planificador de Gastos</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    textAlign: "center",
    fontSize: 30,
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingTop: 20,
  },
});

export default Header;
