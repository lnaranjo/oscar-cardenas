# Closures

## See the Closure

El `closure` es un comportamiento de las funciones y sólo de las funciones. Si no estás tratando con una función, `closure` no se aplica. Un objeto no puede tener `closure`, ni una clase tiene `closure` (aunque sus funciones/métodos sí). Sólo las funciones tienen `closure`.

Para que se observe la `closure`, una función debe ser invocada, y específicamente debe ser invocada en una rama diferente de la cadena de alcance desde donde fue originalmente definida. Una función que se ejecute en el mismo scope en el que se definió no mostraría ningún comportamiento diferente observable con o sin la posibilidad de `closure`; desde la perspectiva de la observación y la definición, eso no es `closure`.

```javascript
function lookupStudent(studentID) {
  var students = [
    { id: 14, name: 'Kyle' },
    { id: 73, name: 'Suzy' },
    { id: 112, name: 'Frank' },
    { id: 6, name: 'Sarah' },
  ];

  return function greetStudent(greeting) {
    var student = students.find((student) => student.id == studentID);
    return `${greeting}, ${student.name}!`;
  };
}
var chosenStudents = [lookupStudent(6), lookupStudent(112)];

// accessing the function's name:
chosenStudents[0].name; // greetStudent
chosenStudents[0]('Hello'); // Hello, Sarah!
chosenStudents[1]('Howdy'); // Howdy, Frank!
```

## The Closure Lifecycle and Garbage Collection (GC)

Dado que el `closure` está intrínsecamente ligado a una instancia de la función, su `closure` sobre una variable dura mientras haya todavía una referencia a esa función.

Si diez funciones se cierran sobre la misma variable, y con el tiempo se descartan nueve de estas referencias de función, la única referencia de función restante todavía preserva esa variable. Una vez que se descarta la última referencia de función, el último `closure` sobre esa variable desaparece, y la propia variable es recolectada por el GB.

```javascript
function manageBtnClickEvents(btn) {
  var clickHandlers = [];
  return function listener(cb) {
    if (cb) {
      let clickHandler = function onClick(evt) {
        console.log('clicked!');
        cb(evt);
      };
      clickHandlers.push(clickHandler);
      btn.addEventListener('click', clickHandler);
    } else {
      // passing no callback unsubscribes
      // all click handlers
      for (let handler of clickHandlers) {
        btn.removeEventListener('click', handler);
      }
      clickHandlers = [];
    }
  };
}
// var mySubmitBtn = ..
var onSubmit = manageBtnClickEvents(mySubmitBtn);

// handle checkout
onSubmit(function checkout(evt) {});

// log action to analytics
onSubmit(function trackAction(evt) {});

// later, unsubscribe all handlers:
onSubmit();
```

Conceptualmente, el `closure` es por variable y no por `scope`. Las devoluciones de Ajax, los manejadores de eventos y todas las demás formas de `closure` de funciones se asumen típicamente para cerrar sólo lo que explícitamente hacen referencia.

```javascript
function manageStudentGrades(studentRecords) {
  var grades = studentRecords.map(getGrade);
  return addGrade;
  // ************************

  function getGrade(record) {
    return record.grade;
  }

  function sortAndTrimGradesList() {
    // sort by grades, descending
    grades.sort(function desc(g1, g2) {
      return g2 - g1;
    });
    // only keep the top 10 grades
    grades = grades.slice(0, 10);
  }

  function addGrade(newGrade) {
    grades.push(newGrade);
    sortAndTrimGradesList();
    return grades;
  }
}
var addNextGrade = manageStudentGrades([
  { id: 14, name: 'Kyle', grade: 86 },
  { id: 73, name: 'Suzy', grade: 87 },
  { id: 112, name: 'Frank', grade: 75 },
  // ..many more records
  { id: 6, name: 'Sarah', grade: 91 },
]);

// later
addNextGrade(81);
addNextGrade(68);
// [ .., .., ... ]
```

## An Alternative Perspective

Revisando nuestra definición de trabajo para el `closure`, la afirmación es que las funciones son "valores de primera clase" que pueden ser pasados alrededor del programa, como cualquier otro valor. El `closure` es la asociación de enlaces que conecta esa función con el scope/variables fuera de ella, sin importar a dónde vaya esa función.

Este modelo alternativo de `closure` afecta a si clasificamos las devoluciones de llamada sincrónicas como ejemplos de `closure` o no.

## Closer to Closure

Exploramos dos modelos para abordar mentalmente el closure:

- **Observational**: el closure es una instancia de función que recuerda sus variables externas incluso cuando esa función es pasada e invocada en otros scopes.
- **Implementational**: el closure es una instancia de función y su entorno de scope se preserva en el lugar mientras cualquier referencia a ella se pasa e invoca desde otros scopes.

Resumiendo los beneficios para nuestros programas:

- El closure puede mejorar la eficiencia al permitir que una instancia de función recuerde información previamente determinada en lugar de tener que calcularla cada vez.
- El closure puede mejorar la legibilidad del código, limitando la exposición del scope al encapsular las variables dentro de las instancias de la función, al tiempo que se asegura que la información de esas variables es accesible para su uso futuro. Las instancias de función resultantes, más estrechas y especializadas, son más limpias a la hora de interactuar, ya que no es necesario pasar la información preservada en cada invocación.
