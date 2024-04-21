import React, { useContext, useState } from 'react';
import {
    Button,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { QuestionsContext } from '../../contexts/QuestionsContext';

import BasicButton from '../../components/BasicButton';
import ConnexaLogoHome from "./../../assets/images/ConnexaLogo.png";

import HeartIcon from '../../assets/icons/HeartIcon';
import RandomIcon from "../../assets/icons/RandomIcon";

const ES_COLOR = "#FCCA46";
const EN_COLOR = "#F37748";

export default function Home({ navigation }) {

    const { language, setLanguage, favorites, setShowFavorites, random, setRandom } = useContext(QuestionsContext);
    const [isEn, setIsEn] = useState(true);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#067BC2",
        },
        logo: {
            width: 480,
            height: 350,
        },
        toggleLanguageContainer: {
            height: 40,
            width: 130,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: isEn ? EN_COLOR : ES_COLOR,
            overflow: 'hidden',
        },
        toggleLanguageTextContainer: {
            height: "100%",
            width: "50%",
            backgroundColor: isEn ? EN_COLOR : ES_COLOR,
            alignSelf: isEn ? "flex-start" : "flex-end",
            alignItems: "center",
            justifyContent: "center",
        },
        connectButtonContainer: {
            elevation: 8,
            backgroundColor: "#D56062",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
        },
        connectButtonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
        },
        favoritesButtonContainer: {
            elevation: 8,
            backgroundColor: favorites.length === 0 ? "#3C161F" : "#6B2737",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 170,
        },
        favoritesButtonText: {
            fontSize: 18,
            color: favorites.length === 0 ? "#808080" : "#fff",
            fontWeight: "bold",
            alignSelf: "center",
        },
        randomButtonContainer: {
            elevation: 8,
            backgroundColor: !random ? "#3C161F" : "#6B2737",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 170,
        }
    });

    const handleLanguageChange = () => {
        setLanguage(language === "Es" ? "En" : language === "En" ? "Es" : "En");
        setIsEn(!isEn);
    }

    const handleQuestionsPageNavigate = () => {
        navigation.navigate("Questions");
    }

    const handleFavoriteQuestionsPageNavigate = () => {
        setShowFavorites(true);
        navigation.navigate("Questions");
    }

    return (
        <View style={styles.container}>
            <Image
                source={ConnexaLogoHome}
                style={styles.logo}
            />
            <TouchableOpacity
                onPress={() => handleLanguageChange()}
                style={styles.toggleLanguageContainer}
            >
                <View style={styles.toggleLanguageTextContainer}>
                    <Text>
                        {language === "Es" ? "Español" : "English"}
                    </Text>
                </View>
            </TouchableOpacity>
            <BasicButton
                customFunction={handleQuestionsPageNavigate}
                text="Connect"
                containerStyle={styles.connectButtonContainer}
                textStyle={styles.connectButtonText}
            />
            <BasicButton
                customFunction={handleFavoriteQuestionsPageNavigate}
                text="My Favorites"
                icon={<HeartIcon fill={favorites.length === 0 ? "#808080" : "#fff"} width="20" height="20" />}
                containerStyle={styles.favoritesButtonContainer}
                textStyle={styles.favoritesButtonText}
                disabled={favorites.length === 0}
            />
            <BasicButton
                customFunction={() => setRandom(!random)}
                icon={
                    <RandomIcon
                        fill={!random ? "#808080" : "#fff"}
                        width="20"
                        height="20"
                    />
                }
                containerStyle={styles.randomButtonContainer}
            />
        </View>
    )
}
