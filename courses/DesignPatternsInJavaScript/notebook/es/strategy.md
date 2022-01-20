# Strategy

Permite seleccionar el comportamiento exacto en tiempo de ejecución.

### Motivación

- Los algoritmos pueden ser descompuestos en partes de niveles altos y bajos.
- Tiene pasos específicos para realizar el funcionamiento.

### Implementación

Veamos el ejemplo que nos permite implementar este principio.

```javascript
const OutputFormat = Object.freeze({
  markdown: 0,
  html: 1,
});

class ListStrategy {
  start(buffer) {}
  end(buffer) {}
  addListItem(buffer, item) {}
}

class MarkdownListStrategy extends ListStrategy {
  addListItem(buffer, item) {
    buffer.push(` * ${item}`);
  }
}

class HtmlListStrategy extends ListStrategy {
  start(buffer) {
    buffer.push('<ul>');
  }

  end(buffer) {
    buffer.push('</ul>');
  }

  addListItem(buffer, item) {
    buffer.push(`  <li>${item}</li>`);
  }
}

class TextProcessor {
  constructor(outputFormat) {
    this.buffer = [];
    this.setOutputFormat(outputFormat);
  }

  setOutputFormat(format) {
    switch (format) {
      case OutputFormat.markdown:
        this.listStrategy = new MarkdownListStrategy();
        break;
      case OutputFormat.html:
        this.listStrategy = new HtmlListStrategy();
        break;
    }
  }

  appendList(items) {
    this.listStrategy.start(this.buffer);
    for (let item of items) this.listStrategy.addListItem(this.buffer, item);
    this.listStrategy.end(this.buffer);
  }

  clear() {
    this.buffer = [];
  }

  toString() {
    return this.buffer.join('\n');
  }
}
```

De tal forma, que al ejecutarlo dará el siguiente resultado:

```javascript
const tp = new TextProcessor();
tp.setOutputFormat(OutputFormat.markdown);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());

tp.clear();
tp.setOutputFormat(OutputFormat.html);
tp.appendList(['alpha', 'beta', 'gamma']);
console.log(tp.toString());
```

### Resumen

- Define un algoritmo de alto nivel.
- Define la interfaz que se espera que la estrategia siga.
- Proporciona una composición dinámica de estrategias resultantes del objeto.
