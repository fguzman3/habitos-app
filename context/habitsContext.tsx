import { habito } from "@/types/habit";
import { isSameDay, isYesterday, toISO } from "@/utils/date";

type HabitState = {
    loading: boolean;
    habits: habito[];
};

type HabitAction =
    |{type:"HYDRATE"; payload: habito[]}
    |{type:"ADD"; title:string; payload:habito}
    |{type:"TOGGLE"; payload: { id: string; today: string }}

//La clave STORAGE_KEY se utiliza para almacenar y recuperar los hábitos desde el almacenamiento local del navegador,
// asegurando que los datos persistan incluso después de cerrar la aplicación.
const STORAGE_KEY = "habits:v1";

//inicializa el estado de la aplicación, cargando los hábitos desde el localStor    ge
const initialState: HabitState = {
    loading: true,
    habits: []
};

//reducer es una function para manejar las acciones de la aplicación mediante el uso de un switch case, 
// dependiendo del "tipo de acción" se actualiza el estado de la aplicación.


function reducer(state: HabitState, action: HabitAction): HabitState {
    switch (action.type) {
        case "HYDRATE": {
        return {loading: true, habits: action.payload};
        };
        case "ADD":{
            const now = new Date();
            const newHabit: habito = {
                id: `h${Date.now()}`,
                title: action.title,
                priority: action.payload.priority,
                streak: 0,
                createdAt: toISO(now),
                lastDoneAt: null,
                isComplete: false
            };
            return {...state, habits: [...state.habits, newHabit]};
            };
        case "TOGGLE":{
            const { id, today } = action.payload;
            const todayISO = new Date(today);

            const updated = state.habits.map(habit => {
                if (habit.id !== id) return habit;
            
                const last = habit.lastDoneAt? new Date(habit.lastDoneAt) : null;
                const yaHechoHoy = last? isSameDay(todayISO,last): false;

                if (yaHechoHoy) {
                    return { 
                        ...habit,
                        streak: Math.max(0, habit.streak - 1), 
                        lastDoneAt: null
                    };
                };

            let newStreak = 1;
            if (last && isYesterday(todayISO, last)) {
                newStreak = habit.streak + 1;
            } else {
                newStreak = 1;  
            }
            
                return {
                    ...habit,
                    streak: newStreak,
                    lastDoneAt: toISO(todayISO)
                };

            } ); 
            return {...state, habits: updated};
        
        };
        default:
            return state;
    }
}