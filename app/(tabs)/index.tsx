import HabitCard from '@/components/HabitCard';
import HabitGreeting from '@/components/HabitGreeting';
import ProfileHeader from '@/components/ProfileHeader';
import Screen from '@/components/Screen';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

/* Uso el hook useTheme para obtener el color de fondo del tema actual, y lo asigno a la variable surface,border,success, etc...
 para usarlo como fondo del card */


  type habito = {
  id: string;
  title: string;
  streak: number;
  isComplete: boolean;
  priority?: "low" | "mid" | "high";
};


const INITIAL: habito[] = [
    {
      id: "h1",
      title: "Leer 30 minutos al día",
      streak: 5,
      isComplete: true
    },
    {
      id: "h2",
      title: "Hacer ejercicio 30 minutos al día",
      streak: 2,
      isComplete: false
    },
    {
      id: "h3",
      title: "Meditar 10 minutos al día",
      streak: 0,
      isComplete: false
    },
    {
      id: "h4",
      title: "Tomar 2 litros de agua al día",
      streak: 3,
      isComplete: false
    }
  ];

  
  const nombre = "Fernando Guzmán";
  const role = "Developer";



export default function HomeScreen() {

  const surface = useThemeColor({}, "surface");   
  const success = useThemeColor({}, "success"); 
  const border = useThemeColor({}, "border"); 
  const onPrimary = useThemeColor({}, "onPrimary");
  const text = useThemeColor({}, "text");
  const muted = useThemeColor({}, "muted");
 


 const [items, setItems] = useState<habito[]>(INITIAL); // Aqui se define el estado de los habitos, que es un array de objetos de tipo habito, y se inicializa con el valor de INITIAL, que es un array de objetos de tipo habito que se definio anteriormente.
 const [nuevo, setNuevo] = useState("");


//  Esta función toggle sirve para marcar/desmarcar un hábito como completado y actualizar su racha:

 const toogle = useCallback((id: string) => { 
    setItems(prev => 
      prev.map(h => {
        if (h.id !== id) return h ;
        
        const completed = !h.isComplete; //aqui asigno el valor contrario al inicial del habito, es decir, si el habito estaba imcompleto, ahora se marca como completo, y viceversa.
       
        const streak = completed ? h.streak + 1 : Math.max(0, h.streak - 1);
        
        return {
          ...h,
          isComplete: completed,
          streak: streak,
        }
 })
    )
  },[]) 

  const agregarHabito = useCallback(() => {
    //la funcion trim() se utiliza para eliminar los espacios en blanco al inicio y al final de la cadena de texto, 
    // y asi evitar que se agreguen hábitos con títulos vacíos o con espacios innecesarios. Es una forma de validar 
    // que el título del hábito no sea solo espacios en blanco, y que tenga al menos un carácter visible antes de agregarlo a la lista de hábitos.
    const title = nuevo.trim();
    // Si el título del hábito es una cadena vacía después de eliminar los espacios en blanco, se retorna sin hacer nada, evitando así agregar un hábito sin título a la lista de hábitos.
    if (!title) {
      Toast.show({
        type: "error",
        text1: "Título vacío",
        text2: "No puedes agregar un hábito sin título",
      });
      return; }

    setItems(prev => [
      ...prev,
      {
        id: `h${Date.now()}`, // se crea el id de concatenando la letra h con el timestamp actual, para asegurar que sea unico.
        title,
        streak: 0,
        isComplete: false,
        priority: "low",
      }
    ]); 
    setNuevo("");
  },[nuevo]) 

  const total = items.length;

  const completados = useMemo(() => {
    return items.filter(h => h.isComplete).length;
  }, [items]);

  return (

    <Screen>
  
       <ProfileHeader name={nombre} role={role} />
        <HabitGreeting nombre={nombre}  />
      <View style={[styles.row, { alignItems: "center" }]}>

      <TextInput
        value={nuevo}
        onChangeText={setNuevo}
        placeholder="Nuevo hábito (ej 'Dormir 8 horas')"
        onSubmitEditing={agregarHabito}
        style={[styles.input, 
              { backgroundColor: surface, borderColor: border, color: text }]}
       
      />

      <Pressable
      onPress={agregarHabito}
      style={[styles.button, { backgroundColor: success }]}>
        <ThemedText type="defaultSemiBold" style={{ color: onPrimary }}>
          Agregar
        </ThemedText>
      </Pressable>

      </View>
        <View style={{ gap: 12 }}>
          {items.map(h => (
            <HabitCard key={h.id} {...h } onToggle={() => toogle(h.id)} />  
            /*<---- Esta es otra forma de pasar las props al componente, 
              usando el operador spread para pasar todas las propiedades del objeto h como props 
              al componente HabitCard, en lugar de pasar cada propiedad individualmente, 
              que seria lo mismo de la linea anterior.  
            */
      ))}
        </View>   
      
</Screen>
  );
}

const styles = StyleSheet.create({
/*   container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F6FF",
    padding: 24,
    gap: 8
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A"
  },

  subtitle: {
    fontSize: 14,
    color: "#334155"

  } */

row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, borderWidth: 1, padding: 12, borderRadius: 8 },
  button: { paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderRadius: 8 },


});
