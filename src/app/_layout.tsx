import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="cadastro"
        options={{ title: "Cadastro" }}
      />
      <Stack.Screen
        name="home"
        options={{ title: "Início" }}
      />
      <Stack.Screen
  name="meu-perfil"
  options={{ title: "Meu Perfil" }}
/>

<Stack.Screen
  name="usuarios"
  options={{ title: "Usuários" }}
/>
      <Stack.Screen
        name="noticias"
        options={{ title: "Notícias" }}
      />
    </Stack>
  );
}
