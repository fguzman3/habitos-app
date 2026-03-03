import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

export default function ProfileHeader({ name, role }: { name: string, role: string }) {

    const card = useThemeColor({}, "surface");
    const primary = useThemeColor({}, "primary");
    const onPrimary = useThemeColor({}, "onPrimary");
    const iniciales = name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();

    return (
        <View style={[styles.card, { backgroundColor: card }]}>
            <View style={[styles.avatar, { backgroundColor: primary }]}>
                <ThemedText style={styles.avatarText}>{iniciales}</ThemedText>
            </View>

            <View style={{ gap: 4 }}>
                <ThemedText style={styles.name}>{name}</ThemedText>
                <ThemedText style={styles.role}>{role}</ThemedText>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 14
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 24,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        lineHeight: 56,
        fontWeight: "bold",
    
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    role: {
        fontSize: 14,
    },   

});
