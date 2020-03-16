import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';


const FavoritesScreen = props => {

    // Используем Redux Store для доступа к глобальным свойствам приложения
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
        <View style={styles.content}>
            <DefaultText>No favorite meals found. Start adding some!</DefaultText>
        </View>
        );
    }

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

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;
