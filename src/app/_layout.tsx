import { View, Text, TextInput, Button } from "react-native";
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
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Detector de Fake News
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        secureTextEntry
        onChangeText={setSenha}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title="Entrar"
        onPress={() => router.push("/home")}
      />

      <View style={{ marginTop: 15 }}>
        <Button
          title="Cadastrar Usuário"
          onPress={() => router.push("/cadastro")}
        />
      </View>
    </View>
  );
}
