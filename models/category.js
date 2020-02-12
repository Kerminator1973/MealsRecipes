// Вспомогательный класс, используется для формирования dummy-data,
// которые применяются для имитации реальной базы данных
class Category {
    constructor(id, title, color) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}

export default Category;