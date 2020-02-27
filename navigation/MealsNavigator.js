import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen'; 
import Colors from '../constants/Colors';

// Определяем идентификаторы компонентов, которые могут быть
// использованы в Stack-компоненте: Catogories, CategoryMeals и
// MealDetail. Имена идентификаторов могут быть произвольными

const MealsNavigator = createStackNavigator({
    Catogories: CategoriesScreen,       // Сокращённая форма
    CategoryMeals: {                    // Полная форма
        screen: CategoryMealsScreen,

        // React Navigation позволяет определить свойства
        // экрана прямо здесь. К сожалению, такой подход не устраняет
        // дублирование настройки 
        /* 
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
        }
        */

        // Вместе с тем, здесь можно определять статические,
        // не изменяемые свойства экрана, например, текст заголовка
        /*
        headerTitle: 'Meal Categories'
        */
    },
    MealDetail: MealDetailScreen
}, 
// Второй параметр функции createStackNavigator() позволяет
// указать настройки "по умолчанию" для всех экранов в Stack.
// Именно такой подход является рекомендуемым!
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
});

// Создаём ещё один навигационный орган управления - BottomTabNavigator.
// Описание компонента очень похоже на описание элементов Stack-а.
// Элементы Stack-а могут быть встроены в BottomTabNavigator - в нашем
// случае, MealsNavigator встраивается в MealsFavTabNavigator
const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: {
        screen: MealsNavigator, 
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} 
                    color={tabInfo.tintColor} />
            }
        }
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            tabBarLabel: 'My Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} 
                    color={tabInfo.tintColor} />
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
});

// Оборачиваем компонент, который является корневым компонентом
// системы навигации специализированным контейнером.
// Если бы мы хотели использовать в качестве навигационного
// компонента только Stack, то следовало бы указать в качестве
// корневого компонента MealsNavigator. Поскольку в приложении
// корневой компонент - это BottomTabNavigator, указываем 
// MealsFavTabNavigator
export default createAppContainer(MealsFavTabNavigator);
