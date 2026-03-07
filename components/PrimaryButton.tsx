import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean; // recordar que el signo "?" significa que esta prop es opcional y no obligatoria.
    style?: ViewStyle | ViewStyle[]; //recordar que el signo "?" significa que esta prop es opcional y no obligatoria
}

export default function PrimaryButton({
    title,
    onPress,
    disabled,
    style,
}: Props) {

    const bg = useThemeColor({}, "primary");
    const onBg = useThemeColor({}, "onPrimary");
    const border = useThemeColor({}, "border");

/* Los props onPress, OnPressIn, OnPressOut son propios del componente Pressable.
El mas usado es onPress
*/
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={title}
            disabled={disabled}
            onPress={onPress}

            style={({ pressed }) =>[
            styles.base,
            {backgroundColor:bg, opacity: disabled ?  0.6 : pressed ? 0.9 : 1},
            {borderColor: border},
            styles as any,
            pressed && {transform:[{scale:0.98}],elevation:2},
            ]}
        >
        <ThemedText>{title}</ThemedText>
        </Pressable>

    )
};

const   styles = StyleSheet.create({
    base: {
        minHeight: 44,
        minWidth:44,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius:12,
        alignItems: "center",
        justifyContent:"center",
        borderWidth:1,
    },
    label:{
        fontWeight: "700"
    },
})