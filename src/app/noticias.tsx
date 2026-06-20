import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Alert,
} from "react-native";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";

export default function Noticias() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fonte, setFonte] = useState("");
  const [classificacao, setClassificacao] = useState("");

  const [idSelecionado, setIdSelecionado] = useState("");
  const [noticias, setNoticias] = useState<any[]>([]);

  async function carregarNoticias() {
    const querySnapshot = await getDocs(
      collection(db, "noticias")
    );

    const lista: any[] = [];

    querySnapshot.forEach((documento) => {
      lista.push({
        id: documento.id,
        ...documento.data(),
      });
    });

    setNoticias(lista);
  }

  async function cadastrarNoticia() {
    await addDoc(collection(db, "noticias"), {
      titulo,
      descricao,
      fonte,
      classificacao,
    });

    Alert.alert("Sucesso", "Notícia cadastrada!");

    limparCampos();
    carregarNoticias();
  }

  function editarNoticia(noticia: any) {
    setIdSelecionado(noticia.id);
    setTitulo(noticia.titulo);
    setDescricao(noticia.descricao);
    setFonte(noticia.fonte);
    setClassificacao(noticia.classificacao);
  }

  async function salvarAlteracoes() {
    if (!idSelecionado) {
      Alert.alert(
        "Aviso",
        "Selecione uma notícia para editar."
      );
      return;
    }

    await updateDoc(
      doc(db, "noticias", idSelecionado),
      {
        titulo,
        descricao,
        fonte,
        classificacao,
      }
    );

    Alert.alert("Sucesso", "Notícia atualizada!");

    limparCampos();
    carregarNoticias();
  }

  async function excluirNoticia(id: string) {
    await deleteDoc(doc(db, "noticias", id));

    Alert.alert("Sucesso", "Notícia removida!");

    carregarNoticias();
  }

  function limparCampos() {
    setIdSelecionado("");
    setTitulo("");
    setDescricao("");
    setFonte("");
    setClassificacao("");
  }

  useEffect(() => {
    carregarNoticias();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Notícias Suspeitas
      </Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Fonte"
        value={fonte}
        onChangeText={setFonte}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Classificação"
        value={classificacao}
        onChangeText={setClassificacao}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <Button
        title="Cadastrar Notícia"
        onPress={cadastrarNoticia}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Salvar Alterações"
        onPress={salvarAlteracoes}
      />

      <View style={{ height: 20 }} />

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
  style={{
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  }}
>
            <Text>
              Título: {item.titulo}
            </Text>

            <Text>
              Fonte: {item.fonte}
            </Text>

           <Text
  style={{
    color: "#DC2626",
    fontWeight: "bold",
    marginTop: 5,
  }}
>
  Classificação: {item.classificacao}
</Text>

            <View style={{ marginTop: 10 }}>
              <Button
                title="Editar"
                onPress={() =>
                  editarNoticia(item)
                }
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Button
                title="Excluir"
                onPress={() =>
                  excluirNoticia(item.id)
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
