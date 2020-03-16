import React, { useEffect, useCallback } from 'react';
import { 
    ScrollView, 
    Image, 
    View, 
    Text, 
    StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';


// Добавляем функциональный компонент для отображения элемента списка.
// Если компонент не планируется использовать где-нибудь ещё, его вполне
// можно сделать локальным
const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
}

const MealDetailScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');

    // Метод some() возвращает true, если в контейнере есть значение
    // удовлетворяющее условию, указанному в callback-функции.
    // Фактически, мы проверяем, есть ли в favoriteMeals элемент
    // с идентификатором mealId
    const currentMealIsFavorite = useSelector(state => 
        state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    // Определяем объект dispatch, который позволяет вызывать action
    // функцию определённую в store/actions/meals.js
    const dispatch = useDispatch();

    // Определяем ещё одну функцию, которая будет передана в навигационную
    // панель, в которой обрабатывается нажатие кнопки "Favorite".
    // Используем useCallback(), чтобы избежать циклических зависимостей
    // при рендеринге страницы
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    // Передача функции toggleFavoriteHandler в навигационную панель
    // осуществляется через props.navigation. Явно указываем, что
    // изменение функции toggleFavoriteHandler не должно приводить к
    // повторному re-rendering-у компонента
    //
    // Добавляем в navigation params информацию о том, находится ли
    // текущее блюдо в списке популярных, или нет
    useEffect(() => {
        props.navigation.setParams({
            toggleFav: toggleFavoriteHandler,
            isFav: currentMealIsFavorite
        });
    }, [toggleFavoriteHandler, currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

// Используем специальное свойство navigationOptions для настройки
// заголовка окна (titleBar)
MealDetailScreen.navigationOptions = (navigationData) => {

    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Favorite"
                iconName={isFavorite ? "ios-star" : 'ios-star-outline'}
                onPress={toggleFavorite}
            />
            </HeaderButtons>)
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'   
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    }, 
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;
