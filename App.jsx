import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Questions from './src/pages/Questions';
import { QuestionsProvider } from './src/contexts/QuestionsContext';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <QuestionsProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerShown: false,
                            title: "Welcome",
                        }}
                    />
                    <Stack.Screen
                        name="Questions"
                        component={Questions}
                        options={{
                            title: "Questions",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QuestionsProvider>
    );
}

export default App;
