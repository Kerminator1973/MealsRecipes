import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CategoriesScreen = props => {

    // Важно понимать, что все компоненты, которые участвуют
    // в React Navigation получают через props дополнительное
    // свойство, которое можно использовать при навигации.
    // Имя этого свойства - "navigation". Через это свойство 
    // можно вызвать различные вспомогательные функции, одной 
    // из которых является navigate(). Эта функция разместит 
    // над текущим экраном ещё один, из которого можно будет 
    // вернуться на предыдущий экран по кнопке «Back». Именно
    // так и реализуется Stack

    return (
        <View style={styles.screen}>
            <Text>The Categories Screen!</Text>
            <Button title="Go to Meals" onPress={() => {
                props.navigation.navigate({routeName: 'CategoryMeals'})
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;
