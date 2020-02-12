import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CATEGORIES} from '../data/dummy-data';

const renderGridItem = (itemData) => {
    return (
        <View style={styles.gridItem}>
            <Text>{itemData.item.title}</Text>
        </View>
    );
}

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
        <FlatList 
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2} />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});

export default CategoriesScreen;
