import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';


const FavoritesScreen = props => {

    // Используем Redux Store для доступа к глобальным свойствам приложения
    const favMeals = useSelector(state => state.meals.meals);

    // Используем полученные данных для формирования списка блюд
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
