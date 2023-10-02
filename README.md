
# CDM (customizable data management) system

Настраиваемая система управления данными

## Создание своего приложения

Папка для конфигурирования приложения имеет название "src".

Она состоит из:

- папки "Models" - в ней хранятся файлы с классами описывающими модели данных;
- файл "Scope" - где, в перечислении, находятся названия классов моделей.


### Описание модели
Создайте свою модель в папке "Models". 

#### Пример:
Предположим, что мы конфигурируем приложение под нужды учёта книг для Библиотеки:
```
@ModelConfig()
class Book extends Model {
  @Field({ type: FieldType.STRING })
  name: string | undefined;

  @Field({ type: FieldType.STRING })
  ISBN: string | undefined;
}
```
Класс создаваемой модели наследуется от класса в [./packages/models/Model.ts](./packages/models/Model.ts)

| Декоратор      | Парметры     | Описание                |
| :--------      | :------- | :------------------------- |
| `@ModelConfig` | `modelName` | Объявление модели данных |
| `@Field`       | `type, required, unique, defaultValue` | Объявление простого поля модели  |

### Описание связей
Создайте ещё одну модель в папке "Models".

#### Пример:
Это может быть модель отделения библиотеки, которое представляет какую-то группу книг одной направленности:
```
@ModelConfig()
export class Group extends Model {
  @Field({ type: FieldType.STRING })
  name: string | undefined;
  @HasMany({ model: Scope.Book })
  books: string | undefined;
}
```
В данном случае, мы хотим чтобы одно отделение библиотеки содержало множество книг. Поэтому, нам подходит связь "один ко многим". 
| Декоратор      | Парметры     | Описание                |
| :--------      | :------- | :------------------------- |
| `@HasOne` | `model` | Объявление связи один к одному |
| `@HasMany` | `model` | Объявление связи один ко многим |

Смысл записи для конкретного примера: группа (`class Group`) имеет много (`@HasMany`) книг (`model: Scope.Book`). Аналогичная логика и для декоратора `@HasOne`.

В объект параметра декоратора отношения передаётся не класс, а его название из перечисления `Scope`. Его также необходимо объявить (пример):
```
export enum Scope {
  Book,
  Group,
}
```

Здесь должны быть названия всех объявленных в папке `src/Models` моделей.

## Файл входа
Приложение конфигурируется и запускается через функцию `AppConfigurator`.

```
AppConfigurator([Book, Group, Author], {
  serverPort: process.env.SERVER_PORT as any,
  database: {
    dialect: "postgres",
    host: process.env.DB_HOST as any,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USER as any,
    password: process.env.DB_PASS as any,
    database: process.env.DB_NAME as any,
  },
});

```
Передаются следующие параметры:
- массив классов моделей
- конфигурационный объект

## Переменные окружения

Чтобы запустить проект, создайте файл `.env` в корне проекта

`DB_USER` - имя пользователя БД

`DB_PASS` - пароль БД

`DB_HOST` - хост БД

`DB_PORT` - порт БД

`DB_NAME` - имя БД

`SERVER_PORT` - порт для разворачивания сервера


## Технологический стек

Node, Express, Sequileze, Swagger-UI

