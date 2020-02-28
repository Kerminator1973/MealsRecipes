import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {

    // Получаем значение параметра, который был передан нам
    // при вызове props.navigation.navigate() в экране, из
    // которого мы перешли сюда (см. renderGridItem() в
    // компоненте CategoriesScreen)
    const catId = props.navigation.getParam('categoryId');
    
    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    return (
        <MealList 
            listData={displayedMeals}
            navigation={props.navigation} />
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

export default CategoryMealScreen;
