import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#F8FAFC",
      }}
    >
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          textAlign: "center",
          color: "#2563EB",
          marginBottom: 10,
        }}
      >
        📰 Fake News
      </Text>

      <Text
        style={{
          textAlign: "center",
          marginBottom: 40,
          color: "#64748B",
        }}
      >
        Ajudando idosos a identificar informações falsas
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#FFF",
          borderWidth: 1,
          borderColor: "#E2E8F0",
          borderRadius: 12,
          padding: 14,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{
          backgroundColor: "#FFF",
          borderWidth: 1,
          borderColor: "#E2E8F0",
          borderRadius: 12,
          padding: 14,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={{
          backgroundColor: "#2563EB",
          padding: 15,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/cadastro")}
        style={{
          backgroundColor: "#1E40AF",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Cadastrar Usuário
        </Text>
      </TouchableOpacity>
    </View>
  );
}
