/* Este componente representa los estilos css para una pantalla general en la aplicación de hábitos */

import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    children: React.ReactNode;
};

export default function Screen({ children }: Props) {
    
    const bg = useTheme().colors.background; 
    /* Uso el hook useTheme para obtener el color de fondo del tema actual, y lo asigno a la variable bg */    
    const insets = useSafeAreaInsets(); 
    // Uso el hook useSafeAreaInsets para obtener los insets de la pantalla, 
    // que son los espacios seguros alrededor de la pantalla, y los asigno a la variable insets.
    return (
        <ThemedView style={[
            styles.screen, 
            { backgroundColor: bg,
            paddingTop: insets.top,
            paddingBottom: insets.bottom +20, // Agrego un padding extra al bottom para que no quede tan pegado al borde de la pantalla
            paddingHorizontal: 20 + insets.left, // Agrego un padding extra al horizontal para que no quede tan pegado al borde de la pantalla
        }]}>
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, //1 columna
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#F8FAFC",
        gap: 16
    }
});