import { View, Text, Button, Alert, TextInput, Modal, useState } from "react-native";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function MeuPerfil() {
  // Dados do usuário (substitua pelos reais)
  const [usuario, setUsuario] = useState({
    id: "ID_AQUI",
    nome: "Usuário Logado",
    email: "usuario@email.com",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);

  async function atualizarPerfil() {
    await updateDoc(doc(db, "usuarios", usuario.id), { nome, email });
    setUsuario({ ...usuario, nome, email });
    setModalVisible(false);
    Alert.alert("Sucesso", "Perfil atualizado!");
  }

  async function deletarConta() {
    Alert.alert(
      "Confirmar",
      "Excluir conta?",
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "usuarios", usuario.id));
            Alert.alert("Conta excluída");
            // Redirecionar para login
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Meu Perfil</Text>

      <View style={{ borderWidth: 1, padding: 20 }}>
        <Text style={{ fontSize: 18 }}>Nome: {usuario.nome}</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Email: {usuario.email}</Text>

        <Button title="Editar Perfil" onPress={() => setModalVisible(true)} />
        <Button title="Excluir Conta" onPress={deletarConta} color="red" />
      </View>

      <Modal visible={modalVisible} transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%" }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Editar Perfil</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
              value={email}
              onChangeText={setEmail}
            />
            <Button title="Salvar" onPress={atualizarPerfil} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
