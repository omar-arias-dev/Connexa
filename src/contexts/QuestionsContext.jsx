import React from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import EXAMPLE_QUESTIONS from "./../data/exampleQuestions.json";

const QuestionsContext = React.createContext(null);

const QuestionsProvider = ({ children }) => {
    const { getItem, setItem, mergeItem, removeItem } = useAsyncStorage('@connexa_favorites');
    const [language, setLanguage] = React.useState("Es");
    const [currentCuestionsList, setCurrentCuestionsList] = React.useState(EXAMPLE_QUESTIONS);
    const [currentCuestionIndex, setCurrentCuestionIndex] = React.useState(0);
    const currentCuestion = currentCuestionsList[currentCuestionIndex];
    const [favorites, setFavorites] = React.useState([]);
    const [showFavorites, setShowFavorites] = React.useState(false);

    React.useEffect(() => {
        getStoredFavorites();
    }, [currentCuestion]);

    React.useEffect(() => {
        showFavorites ? setCurrentCuestionsList(EXAMPLE_QUESTIONS.filter((favorite) => favorites.includes(favorite.id))) : setCurrentCuestionsList(EXAMPLE_QUESTIONS);
    }, [showFavorites]);

    const getStoredFavorites = async () => {
        const storedFavorites = await getItem();
        if(storedFavorites) {
            const parsedStoredFavorites = await JSON.parse(storedFavorites);
            setFavorites(parsedStoredFavorites);
        }
    }

    const isFirst = () => currentCuestionsList.indexOf(currentCuestion) === 0;
    const isLast = () => currentCuestionsList.indexOf(currentCuestion) === currentCuestionsList.length - 1;

    const handleRemoveAllFavorites = async () => {
        await removeItem();
        setFavorites([]);
    }

    return (
        <QuestionsContext.Provider
            value={{
                language,
                setLanguage,
                currentCuestionsList,
                setCurrentCuestionsList,
                currentCuestionIndex,
                setCurrentCuestionIndex,
                currentCuestion,
                favorites,
                showFavorites,
                setShowFavorites,
                setFavorites,
                isFirst,
                isLast,
                handleRemoveAllFavorites,
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
}

export {
    QuestionsContext,
    QuestionsProvider,
};
