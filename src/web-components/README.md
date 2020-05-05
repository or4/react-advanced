# web-components

## Пользовательские элементы (Custom Elements)

### Source
https://learn.javascript.ru/web-components

### Существует два вида пользовательских элементов:

* Автономные пользовательские элементы – «полностью новые» элементы, расширяющие абстрактный класс HTMLElement.
«Автономные» – новые теги, расширяющие HTMLElement.

Схема определения:

```js
class MyElement extends HTMLElement {
  constructor() { super(); /* ... */ }
  connectedCallback() { /* ... */ }
  disconnectedCallback() { /* ... */  }
  static get observedAttributes() { return [/* ... */]; }
  attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
  adoptedCallback() { /* ... */ }
 }
customElements.define('my-element', MyElement);
/* <my-element> */
```

* Пользовательские встроенные элементы – элементы, расширяющие встроенные, например кнопку HTMLButtonElement и т.п.
«Модифицированные встроенные элементы» – расширения существующих элементов.

Требуют ещё один аргумент в .define и атрибут is="..." в HTML:

```js
class MyButton extends HTMLButtonElement { /*...*/ }
customElements.define('my-button', MyElement, {extends: 'button'});
/* <button is="my-button"> */
```

### Cоздания класса со специальными методами

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // элемент создан
  }

  connectedCallback() {
    // браузер вызывает этот метод при добавлении элемента в документ
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }

  static get observedAttributes() {
    return [/* массив имён атрибутов для отслеживания их изменений */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // вызывается при изменении одного из перечисленных выше атрибутов
  }

  adoptedCallback() {
    // вызывается, когда элемент перемещается в новый документ
    // (происходит в document.adoptNode, используется очень редко)
  }

  // у элемента могут быть ещё другие методы и свойства
}

// сообщим браузеру, что <my-element> обслуживается нашим новым классом
customElements.define("my-element", MyElement);
```

### Пример: «time-formatted»

```html
    <script>
        class TimeFormatted extends HTMLElement {
          render() { // (1)
            let date = new Date(this.getAttribute('datetime') || Date.now());

            this.innerHTML = new Intl.DateTimeFormat("default", {
              year: this.getAttribute('year') || undefined,
              month: this.getAttribute('month') || undefined,
              day: this.getAttribute('day') || undefined,
              hour: this.getAttribute('hour') || undefined,
              minute: this.getAttribute('minute') || undefined,
              second: this.getAttribute('second') || undefined,
              timeZoneName: this.getAttribute('time-zone-name') || undefined,
            }).format(date);
          }

          connectedCallback() { // (2)
            if (!this.rendered) {
              this.render();
              this.rendered = true;
            }
          }

          static get observedAttributes() { // (3)
            return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
          }

          attributeChangedCallback(name, oldValue, newValue) { // (4)
            this.render();
          }
        }

        customElements.define("time-formatted", TimeFormatted);
    </script>

    <time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

    <script>
        setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
    </script>
```

## Shadow DOM

https://learn.javascript.ru/shadow-dom

### Встроенный теневой DOM

```html
<input type="range">
```

![dev tools](https://)

Можно менять стили через `pseudo`

```html
<style>
/* делаем цвет шкалы ползунка красным */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

### Теневое дерево

Каждый DOM-элемент может иметь 2 типа поддеревьев DOM:

1. Light tree – обычное, «светлое», DOM-поддерево, состоящее из HTML-потомков. Все поддеревья, о которых мы говорили в предыдущих главах, были «light».
2. Shadow tree – скрытое, «теневое», DOM-поддерево, не отражённое в HTML, скрытое от посторонних глаз.

```html
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')}
    </p>`;
  }
});
</script>

<show-hello name="John"></show-hello>
```

### Свойство mode задаёт уровень инкапсуляции. У него может быть только два значения:

"open" – корень теневого дерева («shadow root») доступен как elem.shadowRoot.

Любой код может получить теневое дерево elem.

"closed" – elem.shadowRoot всегда возвращает null.

## Элемент "template"

```html
<template id="tmpl">
  <script>
    alert("Привет");
  </script>
  <div class="message">Привет, Мир!</div>
</template>

<script>
  let elem = document.createElement('div');

  // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
  elem.append(tmpl.content.cloneNode(true));

  document.body.append(elem);
  // Сейчас скрипт из <template> выполнится
</script>
```

```html
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Нажми на меня</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

    elem.shadowRoot.getElementById('message').innerHTML = "Привет из теней!";
  };
</script>
```

## Слоты теневого DOM, композиция

```html
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Имя:
        <slot name="username"></slot>
      </div>
      <div>Дата рождения:
        <slot name="birthday"></slot>
      </div>
    `;
  }
});
</script>

<user-card>
  <span slot="username">Иван Иванов</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

```html
<user-card>
  #shadow-root
    <div>Имя:
      <slot name="username"></slot>
    </div>
    <div>Дата рождения:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">Иван Иванов</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

### Содержимое слота «по умолчанию»

```html
<div>Имя:
  <slot name="username">Аноним</slot>
</div>
```

### Слот по умолчанию (первый без имени)

```html
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Имя:
      <slot name="username"></slot>
    </div>
    <div>Дата рождения:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Другая информация</legend>
      <slot></slot>
    </fieldset>
    `;
  }
});
</script>

<user-card>
  <div>Я люблю плавать.</div>
  <span slot="username">Иван Иванов</span>
  <span slot="birthday">01.01.2001</span>
  <div>...И играть в волейбол!</div>
</user-card>
```

### Пример меню

```html
<custom-menu>
  <span slot="title">Сладости</span>
  <li slot="item">Леденцы</li>
  <li slot="item">Фруктовые тосты</li>
  <li slot="item">Кексы</li>
</custom-menu>


<template id="tmpl">
  <style> /* стили меню */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl -- шаблон для теневого DOM-дерева (выше)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // мы не можем выбирать узлы светлого DOM, поэтому обработаем клики на слоте
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // открыть/закрыть меню
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
</script>
```

Развёрнутое DOM-дерево становится таким:

```html
<custom-menu>
  #shadow-root
    <style> /* стили меню */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Сладости</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Леденцы</li>
          <li slot="item">Фруктовые тосты</li>
          <li slot="item">Кексы</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

### Обновление слотов

Например, здесь пункт меню вставляется динамически через 1 секунду, и заголовок меняется через 2 секунды:

```html
<custom-menu id="menu">
  <span slot="title">Сладости</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot не может иметь обработчиков событий, поэтому используется первый потомок
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Леденцы</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "Новое меню";
}, 2000);
</script>
```

Обратите внимание, что событие slotchange не запускается через 2 секунды, когда меняется контент slot="title". Это происходит потому, что сам слот не меняется. Мы изменяем содержимое элемента, который находится в слоте, а это совсем другое.

Если мы хотим отслеживать внутренние изменения обычного DOM-дерева из JavaScript, можно также использовать более обобщённый механизм: MutationObserver.

### API слотов

* `node.assignedSlot` – возвращает элемент `<slot>`, в котором находится `node`.
* `slot.assignedNodes({flatten: true/false})` – DOM-узлы, которые находятся в слоте. Опция flatten имеет значение по умолчанию false. Если явно изменить значение на true, она просматривает развёрнутый DOM глубже и возвращает вложенные слоты, если есть вложенные компоненты, и резервный контент, если в слоте нет узлов.
* `slot.assignedElements({flatten: true/false})` – DOM-элементы, которые находятся в слоте (то же самое, что выше, но только узлы-элементы).

```html
<custom-menu id="menu">
  <span slot="title">Сладости</span>
  <li slot="item">Леденцы</li>
  <li slot="item">Фруктовые тосты</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // слотовый элемент добавляется/удаляется/заменяется
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
  }
});

// пункты меню обновятся через 1 секунду
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Кексы</li>')
}, 1000);
</script>
```

## Настройка стилей теневого DOM

```html
<template id="tmpl">
  <style>
    /* стиль будет применён изнутри к элементу <custom-dialog> */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

## Теневой DOM и события

```html
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Нажми меня</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Внутренний целевой элемент: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Внешний целевой элемент: " + e.target.tagName);
</script>
```

Если нажать на кнопку, то выведется следующее:

1. Внутренний целевой элемент: BUTTON – внутренний обработчик событий получает правильный целевой элемент – элемент, находящийся внутри теневого DOM.
2. Внешний целевой элемент: USER-CARD – обработчик событий на уровне документа получает элемент-хозяин в качестве целевого.

### Всплытие и метод event.composedPath()

При клике по `<span slot="username">` вызов метода event.composedPath() вернёт массив: [span, slot, div, shadow-root, user-card, body, html, document, window]. Что в точности отражает цепочку родителей от целевого элемента в развёрнутой DOM-структуре после композиции.

