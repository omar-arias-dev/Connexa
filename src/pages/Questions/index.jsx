import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from "react-native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { QuestionsContext } from '../../contexts/QuestionsContext';

import BasicButton from "../../components/BasicButton";

import Divider from '../../components/Divider';
import BackIcon from "./../../assets/icons/BackIcon";
import HeartIcon from "./../../assets/icons/HeartIcon";
import LeftIcon from '../../assets/icons/LeftIcon';
import RightIcon from '../../assets/icons/RightIcon';

export default function Questions({ navigation }) {
    const {
        language,
        setCurrentCuestionIndex,
        currentCuestionIndex,
        currentCuestion,
        favorites,
        setFavorites,
        showFavorites,
        setShowFavorites,
        handleRemoveAllFavorites,
        isFirst,
        isLast,
    } = useContext(QuestionsContext);
    const { getItem, setItem, mergeItem, removeItem } = useAsyncStorage('@connexa_favorites');
    const [isFavorite, setIsFavorite] = useState(false);

    const styles = StyleSheet.create({
        questionsContainer: {
            flex: 1,
            backgroundColor: "#D2D2D2",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        randomButtonContainer: {
            elevation: 0,
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 50,
            height: 50,
        },
        questionCardContainer: {
            width: "95%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#EEEEEE",
            minHeight: "70%",
            elevation: 10,
            paddingBottom: 100,
            paddingTop: 100,
        },
        questionCardText: {
            width: "90%",
            fontSize: 40,
            textAlign: "center",
        },
        questionButtonsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        previousButtonContainer: {
            backgroundColor: isFirst() ? "#808080" : "#fff",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 25,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 75,
            height: 75,
            elevation: 5,
        },
        nextButtonContainer: {
            backgroundColor: isLast() ? "#808080" : "#fff",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 25,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 75,
            height: 75,
            elevation: 5,
        },
    });

    useEffect(() => {
        setIsFavorite((favorites.length > 0) && favorites.includes(currentCuestion.id));
    });

    useEffect(() => {
        createFavoritesStoreIfNotExists();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: showFavorites ? language === "Es" ? "Favoritos" : "Favorites" : language === "Es" ? "Preguntas" : "Questions",
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "#fff",
            },
            headerLeft: () => (
                <BasicButton
                    customFunction={() => handleHeaderLeftNavigation()}
                    icon={<BackIcon fill="#000" width="25" height="25" />}
                    containerStyle={styles.randomButtonContainer}
                />
            ),
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <BasicButton
                    customFunction={async () => handleStoreFavorites()}
                    icon={<HeartIcon filled={isFavorite} fill="#000" width="20" height="20" />}
                    containerStyle={styles.randomButtonContainer}
                />
            ),
        });
    });

    const createFavoritesStoreIfNotExists = async () => {
        const storedFavorites = await getItem();
        !storedFavorites && await setItem(JSON.stringify([]));
    }

    const handleHeaderLeftNavigation = () => {
        navigation.goBack();
        setCurrentCuestionIndex(0);
        setIsFavorite(false);
        showFavorites && setShowFavorites(false);
    }

    const handleQuestionPreviousChange = () => {
        setCurrentCuestionIndex(currentCuestionIndex - 1);
    }
    
    const handleQuestionNextChange = () => {
        setCurrentCuestionIndex(currentCuestionIndex + 1);
    }

    const handleStoreFavorites = async () => {
        try {
            const storedFavorites = await getItem();
            if (storedFavorites || (favorites.length > 0)) {
                if (!favorites.includes(currentCuestion.id)) {
                    const toStore = [...favorites, currentCuestion.id];
                    await setItem(JSON.stringify(toStore));
                    await setFavorites(toStore);
                } else {
                    const parsedStoredFavorites = await JSON.parse(storedFavorites);
                    const favoritesCopy = [...parsedStoredFavorites];
                    const toDeleteByIndex = parsedStoredFavorites.indexOf(currentCuestion.id);
                    favoritesCopy.splice(toDeleteByIndex, 1);
                    await setItem(JSON.stringify(favoritesCopy));
                    await setFavorites(favoritesCopy);
                }
            } else {
                console.log("Favorites no exist.");
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.questionsContainer}>
            <Text>{language === "En" ? "Question" : "Pregunta"} #{currentCuestion.id}</Text>
            <View style={styles.questionCardContainer}>
                <Divider width={"80%"} />
                <Text style={styles.questionCardText}>{language === "Es" ? currentCuestion.questionEs : currentCuestion.questionEn}</Text>
                <Divider width={"80%"} />
            </View>
            <View style={styles.questionButtonsContainer}>
                <BasicButton
                    customFunction={async () => handleQuestionPreviousChange()}
                    icon={<LeftIcon fill="#000" width="20" height="20" />}
                    containerStyle={styles.previousButtonContainer}
                    disabled={isFirst()}
                />
                <BasicButton
                    customFunction={async () => handleQuestionNextChange()}
                    icon={<RightIcon fill="#000" width="20" height="20" />}
                    containerStyle={styles.nextButtonContainer}
                    disabled={isLast()}
                />
            </View>
            {
                showFavorites && (
                    <Button
                        title="Delete my Favorite Questions"
                        onPress={async () => {
                            await handleRemoveAllFavorites();
                            await navigation.goBack();
                            setShowFavorites(false);
                        }}
                    />
                )
            }
        </View>
    );
}
