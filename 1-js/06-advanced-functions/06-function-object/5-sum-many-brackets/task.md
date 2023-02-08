importance: 2

---

# Sumă cu un număr arbitrar de paranteze

Scrieți funcția `sum` care ar funcționa astfel:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.S. Sugestie: este posibil să fie nevoie să configurați o conversie personalizată de la obiect la primitivă pentru funcția dvs.