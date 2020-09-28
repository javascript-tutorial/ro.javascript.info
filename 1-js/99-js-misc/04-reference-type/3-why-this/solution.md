
Iată explicațiile.

1. Aceasta este o apelare normală a metodei obiectului.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. Similar, aici, parantezele nu schimbă ordinea operațiilor, punctul este oricum primul.
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

3. Aici avem un apel mai complex `(expression).method()`. Apelul funcționează ca și cum ar fi împărțit în două linii:

    ```js no-beautify
    f = obj.go; // calculează expresia
    f();        // apelează ce avem
    ```

    Aici `f()` este executat ca funcție, fără `this`.

4. Similar cu `(3)`, la stânga punctului `.` avem o expresie.

Pentru a explica comportamentul apelurilor `(3)` și `(4)` trebuie să ne reamintim că accesorii de proprietăți (punct sau paranteze pătrate) returnează o valoare de Tip Referință.  

Orice operație pe aceasta, cu excepția unui apel de metodă (precum alocarea `=` sau `||`) o transformă într-o valoare obișnuită, care nu poartă informațiile ce permit setarea variabilei `this`.
