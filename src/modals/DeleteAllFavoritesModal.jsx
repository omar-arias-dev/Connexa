import { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { QuestionsContext } from "../contexts/QuestionsContext";

import BasicButton from "../components/BasicButton";

export default function DeleteAllFavoritesModal({ navigation }) {
    const {
        language,
        setShowFavorites,
        handleRemoveAllFavorites,
    } = useContext(QuestionsContext);

    const styles = StyleSheet.create({
        message: {
            color: "#fff",
            fontSize: 45,
            textAlign: "center",
        },
        modalContainer: {
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#6E6E6E",
            opacity: 0.9,
        },
        DeleteButtonContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
            elevation: 8,
            backgroundColor: "#000",
            borderRadius: 10,
            borderWidth: 2.5,
            borderColor: "#fff",
            paddingVertical: 25,
            paddingHorizontal: 12,
            width: 120,
        },
        DeleteButtonText: {
            color: "#fff",
        },
        CancelButtonContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
            elevation: 8,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 2.5,
            borderColor: "#000",
            paddingVertical: 25,
            paddingHorizontal: 12,
            width: 120,
        },
        CancelButtonText: {
            color: "#000",
        },
        buttonsContainer: {
            display: "flex",
            flexDirection: "row",
            width: "65%",
            justifyContent: "space-around"
        }
    });
    
    useEffect(() => {
        navigation.setOptions({
            title: language === "Es" ? "Eliminar Favoritos" : "Delete Favorites",
        });
    }, []);

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.message}>{language === "En" ? "Are you sure you want to delete all your favorites?" : "Estás seguro de eliminar todos tus favoritos?"}</Text>
            <View style={styles.buttonsContainer}>
                <BasicButton
                    customFunction={() => navigation.goBack()}
                    text={language === "En" ? "Cancel" : "Cancelar"}
                    containerStyle={styles.CancelButtonContainer}
                    textStyle={styles.CancelButtonText}
                />
                <BasicButton
                    customFunction={async () => {
                        await handleRemoveAllFavorites();
                        await navigation.navigate("Home");
                        setShowFavorites(false);
                    }}
                    text={language === "En" ? "Delete" : "Eliminar"}
                    containerStyle={styles.DeleteButtonContainer}
                    textStyle={styles.DeleteButtonText}
                />
            </View>
        </View>
    );
}
