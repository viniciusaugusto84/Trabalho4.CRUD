import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { auth, db } from "../services/firebase";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function MeuPerfil() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
  });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const uid = auth.currentUser?.uid;

        if (!uid) {
          Alert.alert(
            "Erro",
            "Nenhum usuário logado."
          );
          return;
        }

        const q = query(
          collection(db, "usuarios"),
          where("uid", "==", uid)
        );

        const resultado = await getDocs(q);

        resultado.forEach((documento) => {
          const dados = documento.data();

          setUsuario({
            nome: dados.nome,
            email: dados.email,
          });

          setNome(dados.nome);
          setEmail(dados.email);
        });
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erro",
          "Não foi possível carregar o perfil."
        );
      }
    }

    carregarPerfil();
  }, []);

  function salvarAlteracoes() {
    setUsuario({
      nome,
      email,
    });

    Alert.alert(
      "Sucesso",
      "Perfil atualizado com sucesso!"
    );
  }

  function excluirConta() {
    setUsuario({
      nome: "",
      email: "",
    });

    setNome("");
    setEmail("");

    Alert.alert(
      "Sucesso",
      "Conta excluída."
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F8FAFC",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#2563EB",
          marginBottom: 20,
        }}
      >
        Meu Perfil
      </Text>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          padding: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E2E8F0",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginBottom: 5,
            fontWeight: "bold",
          }}
        >
          Nome
        </Text>

        <TextInput
          value={nome}
          onChangeText={setNome}
          style={{
            borderWidth: 1,
            borderColor: "#CBD5E1",
            borderRadius: 8,
            padding: 12,
            marginBottom: 15,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            marginBottom: 5,
            fontWeight: "bold",
          }}
        >
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: "#CBD5E1",
            borderRadius: 8,
            padding: 12,
            marginBottom: 20,
          }}
        />

        <Button
          title="Salvar Alterações"
          onPress={salvarAlteracoes}
        />

        <View style={{ marginTop: 10 }}>
          <Button
            title="Excluir Conta"
            color="red"
            onPress={excluirConta}
          />
        </View>

        <View
          style={{
            marginTop: 25,
            padding: 15,
            backgroundColor: "#EFF6FF",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Dados atuais
          </Text>

          <Text>Nome: {usuario.nome}</Text>
          <Text>Email: {usuario.email}</Text>
        </View>
      </View>
    </View>
  );
}
