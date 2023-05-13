importance: 5

---

# Scoate un singur linked list

Să presupunem că avem un singur linked list (așa cum este descris în capitolul <info:recursion>):

```js
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
```

Scrieți o funcție `printList(list)` care scoate elementele din listă unul câte unul.

Realizați două variante ale soluției: folosind un loop și folosind recursivitatea.

Ce este mai bine: cu recursivitate sau fără ea?
