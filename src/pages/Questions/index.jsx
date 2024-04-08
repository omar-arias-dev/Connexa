import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from "react-native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { QuestionsContext } from '../../contexts/QuestionsContext';

export default function Questions({ navigation }) {
    const {
        language,
        setCurrentCuestionIndex,
        currentCuestionIndex,
        currentCuestion,
        favorites,
        setFavorites,
        isFirst,
        isLast,
    } = useContext(QuestionsContext);
    const { getItem, setItem, mergeItem, removeItem } = useAsyncStorage('@connexa_favorites');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite((favorites.length > 0) && favorites.includes(currentCuestion.id));
    });

    useEffect(() => {
        createFavoritesStoreIfNotExists();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    title="Back"
                    onPress={() => handleHeaderLeftNavigation()}
                />
            ),
        });
    }, []);

    const createFavoritesStoreIfNotExists = async () => {
        const storedFavorites = await getItem();
        !storedFavorites && await setItem(JSON.stringify([]));
    }

    const handleHeaderLeftNavigation = () => {
        navigation.goBack();
        setCurrentCuestionIndex(0);
        setIsFavorite(false);
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
                console.log("Store elemento también creando con key");
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <View>
            <Text>Questions</Text>
            <Text>{language === "Es" ? currentCuestion.questionEs : currentCuestion.questionEn}</Text>
            <Button
                title="Favorite"
                onPress={async () => handleStoreFavorites()}
            />
            <Text>{isFavorite ? "Favorite" : "No Favorite"}</Text>
            <Button
                title="Previous"
                onPress={() => handleQuestionPreviousChange()}
                disabled={isFirst()}
            />
            <Button
                title="Next"
                onPress={() => handleQuestionNextChange()}
                disabled={isLast()}
            />
        </View>
    );
}
