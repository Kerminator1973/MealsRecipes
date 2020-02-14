import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';


const CategoryMealScreen = props => {

    // Получаем значение параметра, который был передан нам
    // при вызове props.navigation.navigate() в экране, из
    // которого мы перешли сюда (см. renderGridItem() в
    // компоненте CategoriesScreen)
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return (
        <View style={styles.screen}>
            <Text>The Category Meals Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Details" onPress={() => {
                props.navigation.navigate({routeName: 'MealDetail'})
            }} />            
        </View>
    );
};

// Свойство navigationOptions может быть определено как функция.
// В этом случае, React Navigation передаёт объект navigationData,
// который является тем же самым, что и props.navigation
// в функциональном компоненте.
// Мы делаем так из-за того, что navigationOptions находится
// вне функционального компонента и мы не имеем доступа к props,
// чо не позволяет извлечь из props параметры (см. getParam())
CategoryMealScreen.navigationOptions = (navigationData) => {

    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealScreen;
