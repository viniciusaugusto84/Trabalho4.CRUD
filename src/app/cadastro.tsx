import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../services/firebase";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function salvarUsuario() {
    try {
      const credencial =
        await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );

      await addDoc(
        collection(db, "usuarios"),
        {
          uid: credencial.user.uid,
          nome,
          email,
        }
      );

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado!"
      );

      setNome("");
      setEmail("");
      setSenha("");

      router.push("/");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message
      );
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Cadastro de Usuário
      </Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

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
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title="Salvar"
        onPress={salvarUsuario}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Voltar"
        onPress={() => router.back()}
      />
    </View>
  );
}      
