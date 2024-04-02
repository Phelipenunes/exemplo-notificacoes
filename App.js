import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shoulSetBadge: true,
    };
  },
});
export default function App() {
  const [dados, setDados] = useState(null);
  useEffect(() => {
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
    }
    permissoesIos();
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      setDados(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMenssgem = async () => {
    const mensagem = {
      title: "Lembrete 🙂",
      body: "Não se esqueça de estudar muito... senão, reprova!",
      data: {
        usuario: "Phelipe",
        cidade: "São paulo",
      },
    };
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 1 },
    });
  };
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Exemplo de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMenssgem} />
        {dados && (
          <View style={{ marginVertical: 8, backgroundColor: "yellow" }}>
            <Text>Usuário: {dados.usuario}</Text>
            <Text>Cidade: {dados.cidade}</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
