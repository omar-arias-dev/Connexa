import React from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import EXAMPLE_QUESTIONS from "./../data/exampleQuestions.json";

const QuestionsContext = React.createContext(null);

const QuestionsProvider = ({ children }) => {
    const { getItem, setItem, mergeItem, removeItem: favoritesRemove } = useAsyncStorage('@connexa_favorites');
    const [language, setLanguage] = React.useState("Es");
    const [currentCuestionsList, setCurrentCuestionsList] = React.useState(EXAMPLE_QUESTIONS);
    const [currentCuestionIndex, setCurrentCuestionIndex] = React.useState(0);
    const currentCuestion = currentCuestionsList[currentCuestionIndex];
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        getStoredFavorites();
    }, [currentCuestion]);

    const getStoredFavorites = async () => {
        const storedFavorites = await getItem();
        if(storedFavorites) {
            const parsedStoredFavorites = await JSON.parse(storedFavorites);
            setFavorites(parsedStoredFavorites);
        }
    }

    const isFirst = () => currentCuestionsList.indexOf(currentCuestion) === 0;
    const isLast = () => currentCuestionsList.indexOf(currentCuestion) === currentCuestionsList.length - 1;

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
                setFavorites,
                isFirst,
                isLast,
                favoritesRemove,
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
