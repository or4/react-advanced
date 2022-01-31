# web-components

## Custom Elements

### Source
https://learn.javascript.ru/web-components

### There are two kinds of custom elements:
* Autonomous custom elements - Fully new elements that extends class HTMLElement

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

* Customized built-in elements that extends for example HTMLButtonElement.

It requires another argument in .define и attribute is="..." in HTML:

```js
class MyButton extends HTMLButtonElement { /*...*/ }
customElements.define('my-button', MyElement, {extends: 'button'});
/* <button is="my-button"> */
```

### Creating class with special methods

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback() {
    // browser call this method when addition an element in the document
    // (can be called many times, if the element are many times added and deleted)
  }

  disconnectedCallback() {
    // browser call this method when deletion an element in the document
    // (can be called many times, if the element are many times added and deleted)
  }

  static get observedAttributes() {
    return [/* attributes names array for monitor changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of the above attributes changes
  }

  adoptedCallback() {
    // called when a element is moved to a new document
  }

  // this element can have other methods and properties
}

// need notify browser that <my-element> is provided our new class
customElements.define("my-element", MyElement);
```

### Example: «time-formatted»

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

### Build-in shadow DOM

```html
<input type="range">
```

![dev tools](https://)

Styles can be changed by `pseudo`

```html
<style>
/* Change the color of the scale pin to red */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

### Shadow tree

Each DOM-element can have 2 types subtrees DOM:
1. Light tree - usually, "light", DOM-subtree, consist of HTML-children.
2. Shadow tree – hidden, "shadow", DOM-subtree, that not displayed in HTML

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

### Property mode define encapsulation level. It can be only open or closed

"open" – shadow root is accessed as elem.shadowRoot.
"closed" – elem.shadowRoot always return null.

## Element "template"

```html
<template id="tmpl">
  <script>
    alert("Привет");
  </script>
  <div class="message">Привет, Мир!</div>
</template>

<script>
  let elem = document.createElement('div');

  // Clone template content to reuse a few times
  elem.append(tmpl.content.cloneNode(true));

  document.body.append(elem);
  // Now the script of <template> start
</script>
```

```html
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from shadow!";
  };
</script>
```

## Slots of shadow DOM, composition

```html
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Имя:
        <slot name="username"></slot>
      </div>
      <div>Date birthday:
        <slot name="birthday"></slot>
      </div>
    `;
  }
});
</script>

<user-card>
  <span slot="username">Ivan Ivanov</span>
  <span slot="birthday">2001/01/01</span>
</user-card>
```

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Date birthday:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">Ivan Ivanov</span>
  <span slot="birthday">2001/01/01</span>
</user-card>
```

### Slot content by default

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

### Slot by default (first time without name)

```html
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Имя:
      <slot name="username"></slot>
    </div>
    <div>Date birthday:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
      <slot></slot>
    </fieldset>
    `;
  }
});
</script>

<user-card>
  <div>I love swim.</div>
  <span slot="username">Ivan</span>
  <span slot="birthday">2001/01/01</span>
  <div>...And play in football!</div>
</user-card>
```

### Example menu

```html
<custom-menu>
  <span slot="title">Sweets</span>
  <li slot="item">Candy</li>
  <li slot="item">Fruits</li>
  <li slot="item">Cake</li>
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
        <span slot="title">Sweets</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Candy</li>
          <li slot="item">Fruits</li>
          <li slot="item">Cake</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

### Update slots

Example, here menu item insert dynamically in 1 second, and title is changed in 2 seconds

```html
<custom-menu id="menu">
  <span slot="title">Sweets</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot cannot have event handlers, therefore is used first child
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Candy</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "New menu";
}, 2000);
</script>
```

### Slots API

* `node.assignedSlot` – return element `<slot>`, that has `node`.
* `slot.assignedNodes({flatten: true/false})` – DOM-nodes, that exist in slot. Option flatten has value by default - false
* `slot.assignedElements({flatten: true/false})` – DOM-elements, that exist in slot

```html
<custom-menu id="menu">
  <span slot="title">Sweets</span>
  <li slot="item">Candy</li>
  <li slot="item">Fruits</li>
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

    // slot element add/remove/replace
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
  }
});

// menu item updates every 1 second
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cake</li>')
}, 1000);
</script>
```

## Settings styles shadow DOM

```html
<template id="tmpl">
  <style>
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

## Shadow DOM and events

```html
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner element: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer element: " + e.target.tagName);
</script>
```
