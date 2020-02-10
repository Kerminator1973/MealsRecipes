import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

// Определяем идентификаторы компонентов, которые могут быть
// использованы в Stack-компоненте: Catogories, CategoryMeals и
// MealDetail. Имена идентификаторов могут быть произвольными

const MealsNavigator = createStackNavigator({
    Catogories: CategoriesScreen,       // Сокращённая форма
    CategoryMeals: {                    // Полная форма
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
});

// Оборачиваем страницы, которые используются в stack-модели
// в специализированный контейнер
export default createAppContainer(MealsNavigator);
