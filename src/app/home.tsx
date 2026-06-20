import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F8FAFC",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          color: "#2563EB",
          marginBottom: 40,
        }}
      >
        📰 Detector de Fake News
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/meu-perfil")}
        style={{
          backgroundColor: "#2563EB",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          👤 Meu Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/usuarios")}
        style={{
          backgroundColor: "#1E40AF",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          👥 Usuários Cadastrados
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/noticias")}
        style={{
          backgroundColor: "#0F172A",
          padding: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          📰 Notícias
        </Text>
      </TouchableOpacity>
    </View>
  );
}
