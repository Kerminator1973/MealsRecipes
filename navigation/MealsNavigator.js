import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen'; 
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' 
            ? Colors.primaryColor : ''
    },
    headerTitleStyle: { // Изменяем шрифт заголовка
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: { // Back text работает только на iOS
        fontFamily: 'open-sans'
    },    
    headerTintColor: Platform.OS === 'android' 
        ? 'white' : Colors.primaryColor
};


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
    defaultNavigationOptions: defaultStackNavOptions
});

// Создаём ещё один StackNavigator для отображения любимых
// продуктов. Ключевая идея состоит в том, что из списка
// любимых продуктов мы можем попасть на страницу с детальным
// описанием продукта. Самый простой способ сделать это -
// создать ещё один вспомогательный Stack
const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

// Конфигурационные данные, которые позволяют настроить содержимое
// Tab Screen для обоих вариантов отображения Bottom Tab - обычного
// и построенного в соответствии с рекомендациями Material Design
const tabScreenConfig = {
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
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'My Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} 
                    color={tabInfo.tintColor} />
            }
        }
    }
};

// Создаём ещё один навигационный орган управления - BottomTabNavigator.
// Описание компонента очень похоже на описание элементов Stack-а.
// Элементы Stack-а могут быть встроены в BottomTabNavigator - в нашем
// случае, MealsNavigator встраивается в MealsFavTabNavigator
const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.accentColor,
        shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {    // Настраиваем стили шрифта в BottomTabNavigator
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontSize: 14,
                fontFamily: 'open-sans'
            }
        }
    });

// Создаём вспомогательный Stack
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    // Можно было-бы изменить текст в DrawerNavigator
    // следующим образом:
    //navigationOptions: {
    //   drawerLabel: 'Filters!!!' 
    //},
    defaultNavigationOptions: defaultStackNavOptions
});

// Определяем Drawer Navigator, который будет являться
// корневым элементом нашей навигационной системы
const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'    // Заменяем текст с "MealsFav" на "Meals"
        }
    },
    Filters: FiltersNavigator
}, {
    // Изменяем шрифт и цвет текста в DrawerNavigator
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontSize: 20,
            fontWeight: 'normal',
            //fontFamily: 'open-sans-bold'  // TODO: Разобраться , почему всегда используется 'open-sans-bold'
        }
    }
});

// Оборачиваем компонент, который является корневым компонентом
// системы навигации специализированным контейнером.
// Если бы мы хотели использовать в качестве навигационного
// компонента только Stack, то следовало бы указать в качестве
// корневого компонента MealsNavigator. Некоторое время
// корневым компонентом был BottomTabNavigator и мы указывали
// MealsFavTabNavigator, как root. 
// Поскольку сейчас  в приложении корневой компонент - это 
// DrawerNavigator, указываем MainNavigator
export default createAppContainer(MainNavigator);
