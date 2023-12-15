# Сборка 2024

Сборка работает на gulp 4 версии

## Начало

Для работы с репозиторием на вашем компьютере потребуется _Git_ и *Node.js*. Перед началом работы убедитесь, что все программы работают. Для этого в терминале введите:

- для *Git*

  ```shell
  git --version
  ```

  _Git_ примерно ответит

  ```shell
  git version 2.42.0.windows.1
  ```

  ![проверка версии git](assets/git.png)

  версия не важна. Главное, что git отреагировал и написал ответ

- для *Node.js*

  ```shell
  node -v
  ```

  _Node.js_ примерно ответит

  ```shell
  v18.18.0
  ```

  ![проверка версии node.js](assets/node.png)

  важно, чтобы была действующая LTS версия (первое число — чётное), то есть не ниже 20.9 или не ниже 18.18.

## Установка

1. Клонируйте репозиторий:

   ```shell
   git clone https://github.com/Zotova2008/new-project-2024.git
   ```

2. Установите зависимости проекта:

   ```shell
   npm i
   ```

3. Начните работу (должен запуститься браузер):

   ```shell
   npm start
   ```

## Структура папок

В каждой папке есть `README.md` файл, который имеет более полное описание по работе с папкой

```shell
├── .github/                      # Специальная папка для github
│   └── workflows/                # Автоматизация для github actions
│       ├── check.yml             # Запускает линтеры на Гитхабе
│       └── gh-pages.yml          # Публикует проект и создаёт ссылку на проект
├── raw/                          # Папка для «сырых» файлов (игнорируются гитом)
│   └── img/                      # Папка для оригиналов картинок
│       └── svg/                  # Папка для оригиналов svg-иконок
├── source/                       # Исходники проекта
│   ├── components/               # Папка для повторяющихся блоков
│   ├── favicons/                 # Папка для фавиконок (кроме favicon.ico)
│   ├── fonts/                    # Папка для шрифтов
│   ├── img/                      # Папка для оптимизированных картинок
│   │   ├── sprite/               # Папка для оптимизированных svg-иконок для преобразования их в спрайт (stack)
│   │   └── svg/                  # Папка для оптимизированных svg-иконок не участвующие в спрайте
│   ├── js/                       # Скрипты
│   │   ├── modules/              # Папка для отдельных модулей
│   │   ├── utils/                # Дежурные библиотеки
│   │   ├── vendor/               # Папка для библиотек js, участвующих в модулях
│   │   ├── vendor.js             # Главный скрипт для библиотек js, участвующих в модулях
│   │   └── main.js               # Главный скрипт
│   ├── lib/                      # Отдельно подключенные библиотеки js, css, php и т.д.
│   ├── scss/                     # Папка для препроцессорных файлов sass
│   │   ├── blocks/               # Стили БЭМ-блоков
│   │   │   └── header.scss       # Стили для конкретного БЭМ-блока
│   │   ├── global                # Глобальные стили проетка
│   │   │   ├── fonts.scss        # Подключение шрифтов к проекту
│   │   │   ├── global.scss       # Глобальные стили, которые касаются всего проекта
│   │   │   └── variables.scss    # Переменные для всего проекта
│   │   ├── mixins/               # Миксины, используемые в проекте
│   │   └── styles.scss           # Основной стилевой файл с импортами всех остальных
│   ├── vendor                    # Папка для сторонних бибилотек
│   └── index.html                # HTML-файл для главной страницы
├── .csscomb.json                 # Настройки сортировки css свойств
├── .editorconfig                 # Настройки форматирования текстовых файлов
├── .eslintrc                     # Правила для eslint
├── .eslintignore                 # Настройки игнорирования файлов для js
├── .gitattributes                # Настройки бинарных файлов
├── .gitignore                    # Настройки игнорирования файлов для git
├── .linthtmlrc                   # Правила для linthtml
├── .htmlhintrc                   # Правила для htmlhint
├── .prettierrc                   # Правила для prettier
├── .stylelintrc                  # Правила для stylelint
├── gulpfile.js                   # Автоматизация для Gulp
├── package.json                  # Зависимости проекта, скрипты, настройки проекта
├── package-lock.json             # Зависимости проекта
├── svgo.config.js                # Настройки для svg
├── webpack.config.js             # Настройки webpack
└── README.md                     # Документация
```

## Основные команды

- `npm start` - запускает сборку с сервером для разработки проекта
- `npm run build` - создаёт папку `build` с оптимизированными файлами для продакшена

## Дополнительные команды

- `npm run preview` - позволяет посмотреть результат работы prod-версии сборки
- `npm run lint` - запускает все проверки (занимает длительное время):
  - `npm run lint:spaces` - проверяет отступы с помощью editorConfig
  - `npm run lint:markup` - проверяет HTML-разметку через W3C-валидатор
  - `npm run lint:html` - проверяет разметку по правилам linthtml
  - `npm run lint:bem` - проверяет правильное использование БЭМ в разметке
  - `npm run lint:styles` - проверяет проект на совместимость с stylelint
  - `npm run lint:scripts` - проверяет скрипты по правилам eslint
- `npm run optimize` - запускает все оптимизации изображений (занимает длительное время):
  - `npm run optimize:raster` - оптимизирует растровые изображения из `raw/img/` в `source/img/`
  - `npm run optimize:vector` - оптимизирует векторные изображения из `raw/img/` в `source/img/`

## Работа с разметкой

Все HTML-файлы с разметкой складывайте в папку `source/`.

```shell
└── source/
    ├──  index.html
    ├──  catalog.html
    └──  form.html
```

Из папки `source/` сборка переносит файлы в папку `build/`.

```shell
└── build/
    ├──  index.html
    ├──  catalog.html
    └──  form.html
```

## Работа со стилями

Все стили находятся в папке `source/styles/`.

```shell
└── source/
    └── styles/
        ├── blocks/
        │   └── header.scss
        ├── global
        │   ├── fonts.scss
        │   ├── global.scss
        │   └── variables.scss
        └── styles.scss
```

Все БЭМ-блоки и остальные препроцессорные файлы подключайте в `source/styles/styles.scss`.

```scss
/* GLOBAL */
@import "./global/variables.scss";
@import "./global/global.scss";
@import "./global/fonts.scss";

/* BLOCKS */
@import "./blocks/header.scss";
```

БЭМ-блоки импортируйте в секцию `/* BLOCKS */`.

Все препроцессорные файлы сборка обработает и превратит в `styles.css`. Файл `styles.css` сборка перенесёт в

```shell
└── build/
    └── styles/
        └── styles.css
```

## Работа с графикой

### Растр

Абсолютно всю растровую графику с двухкратной плотностью из макета складывайте в `raw/img/`. Здесь графика игнорируется гитом.

После того как добавите графику сразу запускайте команду `npm run optimize:raster` (или просто `npm run optimize`) для оптимизации графики и создания `.webp`-версии. Команду нужно запускать один раз при появлении новой графики в проекте.

Новая оптимизированная графика разной плотностью и суффиксами плотности в именах файлов появится в `source/img`. Эту, уже оптимизированную графику нужно коммитить.

### Вектор

Контентную векторную графику (логотип, графики, иллюстрации) также складывайте в `raw/img/`. Запуск команды `npm run optimize:vector` (или просто `npm run optimize`) поместит оптимизированные копии этих svg-файлов в `source/img/`

```shell
└── raw/
    └── img/
```

Векторную графику для спрайта (иконки) складывайте в `raw/img/icons/`.

```shell
└── raw/
    └── img/
        └── icons/
```

Запуск команды `npm run optimize:vector` поместит оптимизированные копии этих svg-файлов в `source/img/icons/`.

```shell
└── source/
    └── img/
        └── icons/
```

При сборке автоматизация перенесёт всю графику из `source/img/` в `build/img/`, а из иконок в `source/img/icons/` создаст спрайт `build/img/icons/stack.svg`.

```shell
└── build/
    └── img/
        ├── icons/                # папка для спрайта
        │   └── stack.svg         # спрайт
        ├── bg.jpg
        ├── bg.webp
        ├── hero.png
        ├── hero.webp
        └── logo.svg
```

### Фавиконки

Варианты фавиконок форматов PNG и SVG следует размещать в `source/favicons/`.

Файлы `favicon.ico` и `manifest.webmanifest` — в `source/`:

```shell
└── source/
    ├── favicons/
    │   ├── 180.png
    │   ├── 192.png
    │   ├── 512.png
    │   └── icon.svg
    ├── favicon.ico
    └── manifest.webmanifest
```

## Работа со шрифтами

Все шрифтовые файлы лежат в `source/fonts/`. Сборка переносит их в `build/fonts/`.

```shell
└── build/
    └── fonts/
        ├──  open-sans.woff2
        └──  open-sans-bold.woff2

```

## Работа со скриптами

Все скрипты лежат в `source/scripts/`.

```shell
└── source/
    └── scripts/
        ├── index.js
        └── modal.js
```

Сборка переносит их в `build/scripts/`.

```shell
└── build/
    └── scripts/
        ├── index.js
        └── modal.js
```

## Работа со сторонними библиотеками

Для удобства внесения сторонних библиотек в ваш проект, вы можете использовать папку `source/vendor/`. В этой папке вы можете размещать любые файлы, связанные с внешними библиотеками.

Например, предположим, что вы хотите добавить в проект библиотеку, которая включает в себя как стилевой файл `library.css`, так и скрипты `library.js`. Чтобы интегрировать их в ваш проект, следуйте этим шагам:

Положите файлы библиотеки в папку `source/vendor/`, как показано ниже:

```shell
└── source/
    └── vendor/
        ├── library.css
        └── library.js
```

Если у вас есть несколько библиотек с разными файлами, вы можете группировать файлы одной библиотеки в ее собственную подпапку. Например:

```shell
└── source/
    └── vendor/
        └── library/
            ├── library.css
            └── library.js
```

При сборке вашего проекта, все файлы из папки `source/vendor/` будут включены в папку `build/vendor/`, сохраняя их структуру. Например:

```shell
└── build/
    └── vendor/
        └── library/
            ├── library.css
            └── library.js
```

Таким образом, вы можете удобно организовать и внедрить сторонние библиотеки в ваш проект, сохраняя их структуру в папке `source/vendor/`.