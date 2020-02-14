import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
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

// Оборачиваем страницы, которые используются в stack-модели
// в специализированный контейнер
export default createAppContainer(MealsNavigator);