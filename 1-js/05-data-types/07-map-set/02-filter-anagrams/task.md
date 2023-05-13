importance: 4

---

# Filtrează anagramele

[Anagrame](https://en.wikipedia.org/wiki/Anagram) sunt cuvinte care au același număr de litere identice, dar în ordine diferită.

De exemplu:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Scrieți o funcție `aclean(arr)` care să returneze un tablou curățat de anagrame.

De exemplu:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" sau "PAN,cheaters,era"
```

Din fiecare grup de anagrame trebuie să rămână un singur cuvânt, indiferent care.

