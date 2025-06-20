# Set

### Определение

Есть список гостей, которых ты приглашаешь на вечеринку. Тебе неважно сколько раз ты случайно вписал Иванова Ивана в черновик, - в итоговом списке приглашенных он окажется лишь один раз. То есть `set` - это список уникальных значений.

### Основные методы

- Создание 
    ```typescript
    // Создать пустое множество
    const mySet = new Set();
    
    // Создать множество из массива, дубликаты будут удалены автоматом
    const numbers: number = [1, 2, 3, 4, 2, 3];
    const uniqueNumbers = new Set(numbers);
    
    console.log(uniqueNumbers); // вывод Set(4) {1, 2, 3, 4}
    ```
- Добавление элемента
    ```typescript
    const fruits = new Set();
    
    fruits.add('apple') // Set { 'apple' }
    fruits.add('banana') // Set { 'apple', 'banana' }
    fruits.add('apple') // Set { 'apple', 'banana' }
  
    console.log(fruits) // Set(2) { 'apple', 'banana'}
    ```
- Проверка наличия элемента
    ```typescript
    console.log(fruits.has('banana')) // true
    console.log(fruits.has('orange')) // false
    ```
- Удаление элемента
  ```typescript
  fruits.delete('banana');
  console.log(fruits.has('banana')) // false
  ```
- Размер множества
  ```typescript
  console.log(fruits.size) // 1
  ```
- Перебор элементов
  ```typescript
  const permissions = new Set(['read', 'write', 'execute'])
  for (const permission of permiossions) {
    console.log(permission)
  }
  ```