import React from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    TouchableOpacity,
    Platform
} from 'react-native';

import { CATEGORIES} from '../data/dummy-data';
import Colors from '../constants/Colors';

const CategoriesScreen = props => {

    // Размещаем функцию внутри компонента для того, чтобы
    // иметь доступ к props
    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity style={styles.gridItem} onPress={() => {
                props.navigation.navigate({routeName: 'CategoryMeals'});
            }}>
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

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

// Реализация React Navigation проверяет наличие у объекта
// типа Screen (которым является CategoriesScreen) поля
// navigationOptions. Если такое поле есть, то оно трактуется
// как словарь настроек. В частности, свойство headerTitle
// трактуется как заголовок формы
CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
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
