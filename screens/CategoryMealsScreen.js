import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';


const CategoryMealScreen = props => {

    const renderMealItem = itemData => {
        return (<MealItem 
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                        mealId: itemData.item.id
                    }});
            }} />);
    };

    // Получаем значение параметра, который был передан нам
    // при вызове props.navigation.navigate() в экране, из
    // которого мы перешли сюда (см. renderGridItem() в
    // компоненте CategoriesScreen)
    const catId = props.navigation.getParam('categoryId');
    
    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    return (
        <View style={styles.screen}>
            <FlatList 
                data={displayedMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
        </View>
    );
};

// Свойство navigationOptions может быть определено как функция.

// В этом случае, React Navigation передаёт объект navigationData,
// который является тем же самым, что и props.navigation
// в функциональном компоненте.
// Мы делаем так из-за того, что navigationOptions находится
// вне функционального компонента и мы не имеем доступа к props,
// что не позволяет извлечь из props параметры (см. getParam())
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
