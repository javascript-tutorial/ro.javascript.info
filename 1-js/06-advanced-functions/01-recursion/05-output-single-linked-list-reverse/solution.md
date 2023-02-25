# Folosind o recursiune

Logica recursivă este un pic mai înșelătore aici.

Trebuie să scoatem mai întâi restul listei și *apoi* să o scoatem pe cea curentă:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Utilizarea unui loop

Varianta loop este de asemenea un pic mai complicată decât scoaterea directă.

Nu există nicio modalitate de a obține ultima valoare din `list`. De asemenea nu putem "merge înapoi".

Așadar, ceea ce putem face este să parcurgem mai întâi elementele în ordine directă și să le reținem într-un array, iar apoi să scoatem ceea ce am reținut în ordine inversă:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Vă rugăm să notați că soluția recursivă face de fapt exact la fel: urmărește lista, își amintește elementele din lanțul de apeluri nested (în execution context stack) și apoi le scoate.
