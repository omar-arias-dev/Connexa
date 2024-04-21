import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { QuestionsContext } from '../../contexts/QuestionsContext';

import BasicButton from '../../components/BasicButton';
import ConnexaLogoHome from "./../../assets/images/ConnexaLogo.png";

import TriangleDivider from '../../components/TriangleDivider';
import HeartIcon from '../../assets/icons/HeartIcon';
import RandomIcon from "../../assets/icons/RandomIcon";
import ConnectIcon from "../../assets/icons/ConnectIcon";

const ES_COLOR = "#F24C00";
const EN_COLOR = "#F37748";

export default function Home({ navigation }) {

    const { language, setLanguage, favorites, setShowFavorites, random, setRandom } = useContext(QuestionsContext);
    const [isEn, setIsEn] = useState(true);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#84BCDA",
        },
        logo: {
            width: 480,
            height: 350,
            zIndex: 2,
        },
        tringleDivider: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
            lineHeight: 0,
        },
        toggleLanguageContainer: {
            height: 70,
            width: 200,
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
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
            elevation: 8,
            backgroundColor: "#D56062",
            borderRadius: 10,
            paddingVertical: 25,
            paddingHorizontal: 12,
            width: 200,
        },
        connectButtonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
        },
        favoritesAndShuffleContainer: {
            width: "80%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        favoritesButtonContainer: {
            elevation: 8,
            backgroundColor: favorites.length === 0 ? "#3C161F" : "#6B2737",
            borderRadius: 10,
            paddingVertical: 25,
            paddingHorizontal: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 200,
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
            width: 50,
            height: 50,
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
            <TriangleDivider />
            <TouchableOpacity
                onPress={() => handleLanguageChange()}
                style={styles.toggleLanguageContainer}
            >
                <View style={styles.toggleLanguageTextContainer}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18, }}>
                        {language === "Es" ? "Español" : "English"}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.favoritesAndShuffleContainer}>
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
            <BasicButton
                customFunction={handleQuestionsPageNavigate}
                text="Connect"
                icon={<ConnectIcon fill="#fff" width="20" height="20" />}
                containerStyle={styles.connectButtonContainer}
                textStyle={styles.connectButtonText}
            />
        </View>
    )
}
