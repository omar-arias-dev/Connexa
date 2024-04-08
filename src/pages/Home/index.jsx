import React, { useContext } from 'react';
import { Button, Text, View } from "react-native";

import { QuestionsContext } from '../../contexts/QuestionsContext';

export default function Home({ navigation }) {
    const { language, setLanguage, favoritesRemove } = useContext(QuestionsContext);

    const handleLanguageChange = () => {
        setLanguage(language === "Es" ? "En" : language === "En" ? "Es" : "En")
    }

    const handleQuestionsPageNavigate = () => {
        navigation.navigate("Questions");
    }

    return (
        <View>
            <Text>Home</Text>
            <Button
                title={language}
                onPress={() => handleLanguageChange()}
            />
            <Button
                title="Connect"
                onPress={() => handleQuestionsPageNavigate()}
            />
            <Button
                title='remove'
                onPress={async () => favoritesRemove()}
            />
        </View>
    )
}
