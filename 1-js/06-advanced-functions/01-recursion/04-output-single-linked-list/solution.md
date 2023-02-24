# Soluție bazată pe loop

Varianta soluției bazată pe loop:

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

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Vă rugăm să rețineți că folosim o variabilă temporară `tmp` pentru a parcurge lista. Din punct de vedere tehnic, am putea folosi în schimb un parametru de funcție `list`:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Dar asta ar fi neînțelept. În viitor s-ar putea să avem nevoie să extindem o funcție, să facem altceva cu lista. Dacă schimbăm `list`, atunci pierdem o astfel de abilitate.

Vorbind despre nume de variabile bune, `list` aici este lista însăși. Primul element al acesteia. Și ar trebui să rămână așa. Este clar și de încredere.

De cealaltă parte, rolul lui `tmp` este exclusiv o traversare a listei, ca și `i` în bucla `for`.

# Soluție recursivă

Varianta recursivă a `printList(list)` urmează o logică simplă: pentru a scoate o listă trebuie să scoatem elementul curent `list`, apoi să facem același lucru pentru `list.next`:

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

function printList(list) {

  alert(list.value); // afișează elementul curent

  if (list.next) {
    printList(list.next); // procedează la fel pentru restul listei
  }

}

printList(list);
```

Acum ce este mai bine?

Din punct de vedere tehnic, un loop este mai eficient. Aceste două variante fac același lucru, dar loop-ul nu consumă resurse pentru apeluri de funcții nested.

De partea cealaltă, varianta recursivă este mai scurtă și uneori mai ușor de înțeles.
