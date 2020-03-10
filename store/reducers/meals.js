import { MEALS } from '../../data/dummy-data';

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
    return state;
}

export default mealsReducer;