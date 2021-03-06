import { MEALS } from '../../data/dummy-data';

// Импортируем идентификатор действия (action)
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

// Определяем начальное состояние Reducer-а
const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

// Reducer - это функция, которая принимает два параметра: состояние,
// которое изменяется и действие.
// Синтаксис передачи параметров позволяет присвоить initialState
// состоянию при создании функции mealsReducer в первый раз
const mealsReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_FAVORITE:

            // Данное действие либо добавляет идентификатор любимого 
            // блюда в массив favoriteMeals в глобальном состоянии,
            // либо исключает идентификатор из списка

            const existingIndex = state.favoriteMeals.findIndex(
                meal => meal.id === action.mealId);
            if (existingIndex >= 0) {

                // Для любых действий с состояниями необходимо
                // создавать новый объект с состоянием
                const updatedFavMeals = [...state.favoriteMeals];

                // splice() позволяет удалить элемент из списка
                updatedFavMeals.splice(existingIndex, 1);

                // Возвращаем старый state, но заменяем у него
                // данные по ключу favoriteMeals
                return { ...state, favoriteMeals: updatedFavMeals}

            } else {

                const meal = state.meals.find(meal => meal.id === action.mealId);

                return { ...state, 
                    favoriteMeals: state.favoriteMeals.concat(meal)
                }
            }
            break;

        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                return true;
            });
            return {...state, filteredMeals: updatedFilteredMeals};
    }

    return state;
}

export default mealsReducer;