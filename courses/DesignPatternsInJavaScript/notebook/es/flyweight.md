# Flyweight

Una técnica de optimización de espacio que usa poca memoria almacenando información asociada en objetos similares.

### Motivación

- Evita reduncia cuando se almacenan datos.
- Operar mediante rangos, conversiones o transformaciones.
- Guardar listados de entradas una y otra vez.

### Implementación

Comencemos con un ejemplo de formato de texto:

```javascript
class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).map(() => false));
  }

  capitalize(start, end) {
    for (let i = start; i <= end; ++i) this.caps[i] = true;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }

    return buffer.join('');
  }
}
```

Ahora escribimos una versión mejorada:

```javascript
class TextRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.capitalize = false;
    // other formatting options here
  }

  covers(position) {
    return position >= this.start && position <= this.end;
  }
}

class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end) {
    let range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize) c = c.toUpperCase();
      }
      buffer.push(c);
    }
    return buffer.join('');
  }
}
```

La diferencia la podemos notar aquí:

```javascript
const text = 'This is a brave new world';
let ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log(ft.toString());

let bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());
```

### Resumen

- Permite almacenar información común de forma externa.
- Especifica mediante indices o referencias la ifnrmación externa.
- Define la idea de rangos en una collecciñon homogénea y almacena información relacionada con los rangos.
