# Façade

Proporciona una forma simple de entender y usar una interfaz de usuario en un código largo y sofisticado.

### Implementación

```javascript
class Buffer extends Array {
  constructor(width = 30, height = 20) {
    super();
    this.width = width;
    this.height = height;
    this.alloc(width * height);
  }

  write(text, position = 0) {
    // write to the buffer
  }
}

class Viewport {
  constructor(buffer = new Buffer()) {
    this.buffer = buffer;
    this.offset = 0;
  }

  // high-level
  append(text, pos) {
    this.buffer.write(text, pos + this.offset);
  }

  getCharAt(index) {
    return this.buffer[this.offset + index];
  }
}

class Console {
  constructor() {
    this.buffer = new Buffer();
    this.currentViewport = new Viewport(this.buffer);
    this.buffers = [this.buffer];
    this.viewports = [this.currentViewport];
  }

  // high-level
  write(text) {
    this.currentViewport.buffer.write(text);
  }

  // low-level
  getCharAt(index) {
    return this.currentViewport.getCharAt(index);
  }
}

const c = new Console();
c.write('hello');
const ch = c.getCharAt(0);
```

### Resumen

- Construir una `Façade` para proporcionar una API simplificada sobre un conjunto de clases.
- Puede querer exponer las partes internas a través de la "fachada".
- Puede permitir a los usuarios escalar para usar APIs más complejas si lo necesitan.
