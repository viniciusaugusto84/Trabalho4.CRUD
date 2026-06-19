import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
} from "react-native";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const [idSelecionado, setIdSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function carregarUsuarios() {
    const querySnapshot = await getDocs(collection(db, "usuarios"));

    const lista: any[] = [];

    querySnapshot.forEach((documento) => {
      lista.push({
        id: documento.id,
        ...documento.data(),
      });
    });

    setUsuarios(lista);
  }

  async function excluirUsuario(id: string) {
    await deleteDoc(doc(db, "usuarios", id));

    Alert.alert("Sucesso", "Usuário removido.");

    carregarUsuarios();
  }

  function editarUsuario(usuario: any) {
    setIdSelecionado(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
  }

  async function salvarAlteracoes() {
    if (!idSelecionado) {
      Alert.alert("Aviso", "Selecione um usuário para editar.");
      return;
    }

    await updateDoc(doc(db, "usuarios", idSelecionado), {
      nome,
      email,
    });

    Alert.alert("Sucesso", "Usuário atualizado.");

    setIdSelecionado("");
    setNome("");
    setEmail("");

    carregarUsuarios();
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Usuários Cadastrados
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

      <Button
        title="Salvar Alterações"
        onPress={salvarAlteracoes}
      />

      <View style={{ height: 20 }} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text>Nome: {item.nome}</Text>
            <Text>Email: {item.email}</Text>

            <View style={{ marginTop: 10 }}>
              <Button
                title="Editar"
                onPress={() => editarUsuario(item)}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Button
                title="Excluir"
                onPress={() => excluirUsuario(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
