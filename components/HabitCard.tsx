
//  a este componente se le van pasar el titulo del habito, la racha y si esta completo o no por props y no por parametros directamente en el componente,

import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, View } from "react-native";

//por ser typescript, se le va a definir un tipo de dato 
// para las props que se le van a pasar al componente, 
// y se le va a asignar ese tipo de dato a las props del componente, 
// para que el componente sepa que tipo de datos va a recibir y pueda validar que se le estan pasando los datos correctos.

type Props = {
    title: string;
    streak: number;
    isComplete?: boolean;
    priority?: "low" | "mid" | "high";
    onToggle?: () => void; //  Esta es una función que se va a ejecutar cuando se haga click en el habito, y no recibe ningún parámetro y no devuelve nada, por eso se le asigna el tipo de dato () => void
};


export default function HabitCard({
    title,
    streak,
    isComplete = false,
    priority = 'high',
    onToggle,


}: Props)  //Aqui le paso los props que va a recibir, indicandole que son props 
{
    const surface = useThemeColor({}, "surface"); /* Uso el hook useTheme para obtener el color de fondo del tema actual, y lo asigno a la variable surface, para usarlo como fondo del card */
    const success = useThemeColor({}, "success"); /* Uso el hook useTheme para obtener el color de fondo del tema actual, y lo asigno a la variable surface, para usarlo como fondo del card */
    const border = useThemeColor({}, "border"); /* Uso el hook useTheme para obtener el color de fondo del tema actual, y lo asigno a la variable surface, para usarlo como fondo del card */

    const p = priorityStyle[priority]; /* Creo esta variable para no  repetir el texto en cada parte*/

    return (

        <Pressable
            onPress={onToggle}
            style={({pressed}) => [ styles.card,
                {backgroundColor: surface, 
                    opacity: pressed ? 0.9 : 1,
                    borderColor: isComplete ? success : border,
                } 
            ]}           
        >
            { /* Le asigno la función onToggle al evento onPress del Pressable, para que se ejecute cuando se haga click en el habito */}
            <View style={styles.row}>
                <ThemedText style={[styles.title]}>{title}</ThemedText>
                <ThemedText
                    style={[
                        styles.badge,
                        { backgroundColor: p.backgroundColor, color: p.color }
                    ]}
                >
                    {priority}
                </ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type="defaultSemiBold" style={styles.streak}>
                    {`🔥 ${streak} días`}
                </ThemedText>
                {isComplete && <ThemedText style={styles.badge}>✓</ThemedText>}

            </View>
        </Pressable>
    )
};



const styles = StyleSheet.create({

    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        gap: 6,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },

    cardDone: {
        borderWidth: 2,
        borderColor: "#16a34A",
        backgroundColor: "#d4edda"
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    // title: { fontSize: 16, fontWeight: "bold", color: "#0F172A" },
    // streak: { fontSize: 12, color: "#a6b3c6" },
    // badge: { fontSize: 12,  },

     title: { fontSize: 16, fontWeight: "bold"},
    streak: { fontSize: 12 },
    badge: { fontSize: 12, color: "#0ead3b" }
    
});

const priorityStyle = {
    low: { backgroundColor: '#2ecc71', color: '#0b3d2e'},
    mid: { backgroundColor: '#f39c12', color: '#4a2e00' },
    high: { backgroundColor: '#e74c3c', color: '#4a0e0e' },
};