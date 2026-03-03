import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function HabitGreeting({nombre = "Amanda"}) { 
    const fecha = new Date();
    const hora = fecha.getHours();
    const saludo = hora < 12 ? "Buenos días" : hora < 20 ? "Buenas tardes" : "Buenas noches";
   

    return (
        <ThemedView style={Styles.container}>
            <ThemedText style={Styles.title}>
          {saludo}
          {nombre ? `, ${nombre}!` : ""}
            </ThemedText>
            <ThemedText style={Styles.subtitle}>
                { /* El siguiente linea de código me muestra en pantalla la fecha y hora actual ejemplo: 28/09/2024 - 14:30:45 */} 
                {fecha.toLocaleDateString("es-ES",
                { day: "2-digit", month: "2-digit", year: "numeric" })} - {fecha.toLocaleTimeString()}    
            </ThemedText>

      </ThemedView>
    );
}

const  Styles = StyleSheet.create({
  container: {
   gap: 4, marginBottom: 16},
  
  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
    color: "gray",
  },
}) ;