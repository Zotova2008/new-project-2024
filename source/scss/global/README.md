# Папка для глобальных стилей

_fonts.scss_

```scss
@font-face {
}
```

_variables.scss_

```scss
$color-basis: #000000;
$color-accent: #ffffff;
```

_global.scss_

```scss
*,
*::before,
*::after {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

html {
}
body {
}
```

# Папка для стилей

Структура файлов:

```bash
./
├── blocks
│   ├── button.scss
│   ├── link.scss
│   └── page.scss
├── global
│   ├── fonts.scss
│   ├── global.scss
│   ├── media.scss
│   ├── mixins.scss
│   └── variables.scss
├── style.scss
└── README
```

Для генерации фона для всех форматов, на всех вьюпортах и всех плотностях экрана используется миксин `bg-image()`. При вызове миксина нужно передать в него имя изображения, указанное в `_data.js`, а в `background` использовать кастомное свойство `--bg-image`, генерируемое миксином.

```scss
.block {
  background: var(--bg-image) no-repeat center / contain;

  @include bg-image("name");
}
```

Чтобы сгенерированные стили для поддержки форматов _webp_ и *avif* заработали, перед стилевым `link` в `head` должен быть вставлен скрипт детекта поддержки (шаблоном `detect-format.twig` он инклюдится в `_layout.twit`).
