importance: 5

---

# O întrebare despre "if"

<<<<<<< Updated upstream
Care dintre aceste alerte vor fi executate?

Care va fi rezultatul expresiei `if(...)`?
=======
Care dintre aceste `alert`e vor fi executate?

Care vor fi rezultatele expresiilor înăuntrul lui `if(...)`?
>>>>>>> Stashed changes

```js
if (-1 || 0) alert("first");
if (-1 && 0) alert("second");
if (null || (-1 && 1)) alert("third");
```
