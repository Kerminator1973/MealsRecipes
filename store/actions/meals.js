// Определяем уникальную константу, которая будет использоваться
// как имя действия (action)
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

// Определяем ActionCreator. Возвращаемые данные попадут
// в reducer (второй параметр функции)
export const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE, mealId: id
    };
};

// 
export const setFilters = filterSettings => {
    return {
        type: SET_FILTERS,
        filters: filterSettings
    };
};