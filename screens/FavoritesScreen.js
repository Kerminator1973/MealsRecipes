import React from 'react';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';


const FavoritesScreen = props => {

    // Извлекаем из dummy-data пару элементов, которые будут временно
    // играть роль назначенных любимых блюд
    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

    return <MealList listData={favMeals} navigation={props.navigation} />;
};

// Настраиваем заголовок окна
FavoritesScreen.navigationOptions = {
    headerTitle: 'Your Favorites'
};

export default FavoritesScreen;
