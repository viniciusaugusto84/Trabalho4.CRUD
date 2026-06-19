import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Detector de Fake News
      </Text>

      <Button
        title="Meu Perfil"
        onPress={() => router.push("/perfil")}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Analisar Notícias"
        onPress={() => router.push("/noticias")}
      />
    </View>
  );
}
