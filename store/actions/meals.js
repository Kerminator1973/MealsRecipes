// Определяем уникальную константу, которая будет использоваться
// как имя действия (action)
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Определяем ActionCreator. Возвращаемые данные попадут
// в reducer (второй параметр функции)
export const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE, mealId: id
    };
};