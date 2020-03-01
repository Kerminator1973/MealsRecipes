import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';


const FavoritesScreen = props => {

    // Извлекаем из dummy-data пару элементов, которые будут временно
    // играть роль назначенных любимых блюд
    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

    return <MealList listData={favMeals} navigation={props.navigation} />;
};

// Настраиваем заголовок окна
FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )        
    }
};

export default FavoritesScreen;
