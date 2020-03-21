# Tipuri de date

O variabilă în JavaScript poate conține orice date. O variabilă poate fi la un moment dat un șir de caractere și apoi poate deveni un număr:

```js
// nicio eroare
let mesaj = "bună";
mesaj = 123456;
```

Limbajele de programare care permit astfel de lucruri se numesc „dinamice”, însemnând că există tipuri de date, dar variabilele nu sunt legate de niciunul dintre acestea.

Există șapte tipuri de date de bază în JavaScript. Aici, le vom acoperi pe cazuri generale, iar în următoarele capitole vom vorbi despre fiecare în detaliu.

## Un număr

```js
let n = 123;
n = 12.345;
```

Tipul *număr* reprezintă atât numere întregi cât și zecimale.

Există multe operații cu numere, de exemplu înmulțire `*`, împărțire `/`, adunare `+`, subtraction `-` și altele.

Pe lângă numerele normale, există așa-numitele „valori numerice speciale”, care corespund tot acestui tip de date: `Infinity` (infinit), `-Infinity` (minus infinit) și `NaN` (nu este un număr).

- `Infinity` reprezintă [infinitul](https://ro.wikipedia.org/wiki/Infinit) matematic ∞. Are o valoare specială, mai mare decât orice alt număr.

    Îl putem obține ca rezultat al împărțirii la zero:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Sau chiar prin referință directă:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` („Not a number”, adică „nu este un număr”) reprezintă o eroare de calcul. Este rezultatul unei operații matematice greșite sau nedefinite, de exemplu:

    ```js run
    alert( "nu este un număr" / 2 ); // NaN, o astfel de împărțire a unui cuvânt la o cifră este imposibilă
    ```

    `NaN` nu se schimbă. Orice altă operație asupra lui `NaN` rezultă în `NaN`:

    ```js run
    alert( "nu este un număr" / 2 + 5 ); // NaN
    ```

    Deci, dacă este un `NaN` pe undeva într-o operație matematică, se propagă în întreg rezultatul.

```smart header="Operațiile matematice sunt sigure"
Ești „în siguranță” atunci când rulezi operații matematice în JavaScript. Putem face orice: să împărțim la zero, să împărțim șiruri de caractere la numere ș.a.m.d.

Programul nu se va opri niciodată cu o eroare fatală (nu va „muri”). În cel mai rău caz, vom obține `NaN` ca rezultat.
```

Valorile numerice speciale aparțin din punct de vedere formal tipului „număr”. Evident că nu sunt numere în sensul uzual al cuvântului.

Vom afla mai multe despre lucrul cu numere în capitolul <info:number>.

## Un șir de caractere

Un șir de caractere („string” în engleză) în JavaScript trebuie înconjurat de ghilimele englezești (`" "` sau `' '`).

```js
let str = "Bună";
let str2 = 'Aceste ghilimele simple sunt și ele în regulă';
let phrase = `putem încorpora un alt ${str}`;
```

În JavaScript sunt 3 tipuri de ghilimele.

1. Ghilimele duble: `"Bună"`.
2. Ghilimele simple: `'Bună'`.
3. Accente grave: <code>&#96;Bună&#96;</code>.

Ghilimelele duble și simple sunt ghilimelele „uzuale”. Nu există nicio diferență între ele în JavaScript.

Accentele grave sunt ghilimele care „exind funcționalitatea”. Ne permit să încorporăm variabile și expresii într-un șir de caractere prin punerea lor între `${…}`, de exemplu:

```js run
let nume = "Ion";

// încorporăm o variabilă
alert( `Bună, *!*${name}*/!*!` ); // Bună, Ion!

// încorporăm o expresie
alert( `rezultatul este *!*${1 + 2}*/!*` ); // rezultatul este 3
```

Expresia dinăuntrul `${…}` este evaluată și rezultatul devine o parte din șirul de caractere. Putem pune orice acolo: o variabilă ca `nume` sau o operație aritmetică precum `1 + 2` sau ceva mai complex.

Te rugăm să ții minte că asta se poate realiza numai între accente grave. Alte ghilimele nu au această funcționalitate de încorporare!
```js run
alert( "rezultatul este ${1 + 2}" ); // rezultatul este ${1 + 2} (ghilimelele duble nu fac nimic)
```

Vom acoperi șirurile de caractere mai bine în capitolul <info:string>.

```smart header="Nu există un tip *caracter*."
În unele limbaje există un tip special „caracter” care stochează un singur caracter. De exemplu, în limbajele C și Java este `char`.

În JavaScript nu există un astfel de tip. Există doar tipul `șir de caractere`. Un șir de caractere poate fi constituit dintr-unul sau mai multe caractere.
```

## Un boolean (tip de date logice)

Un tip boolean are doar două valori: `true` (adevărat) și `false` (fals).

Acest tip este folosit de obicei pentru a stoca date de tipul da/nu: `true` înseamnă „da, corect” și `false` înseamnă „nu, greșit”.

De exemplu:

```js
let căsuțăNumeBifată = true; // da, căsuța pentru nume este bifată
let căsuțăVârstăBifată = false; // nu, căsuța pentru vârstă nu este bifată
```

Valorile de tip boolean pot apărea și ca rezultat al comparațiilor:

```js run
let maiMare = 4 > 1;

alert( maiMare ); // true (rezultatul comparației este „da”)
```

Vom acoperi tipul boolean mai în detaliu în capitolul <info:logical-operators>.

## Valoarea „null”

Valoarea specială `null` nu aparține niciunuia dintre tipurile descrise mai sus.

Ea însăși formează un tip separat care conține doar valoarea `null`:

```js
let vârstă = null;
```

În JavaScript, `null` nu este o „referință către un obiect inexistent” sau un „indicator nul” ca în alte limbaje.

Este doar o valoare specială care reprezintă „nimic”, „gol” sau „valoare necunoscută”.

Codul de mai sus precizează că `vârstă` este necunoscută sau goală dintr-un anumit motiv.

## Valoarea „undefined”

Valoarea specială `undefined` este singulară de asemenea. Constituie un tip doar al ei, exact ca `null`.

Valoarea `undefined` înseamnă „valoare neatribuită”.

Dacă o variabilă este declarată, dar nu i se atribuie nimic, atunci valoarea ei este `undefined`:

```js run
let x;

alert(x); // afișază "undefined"
```

Din punct de vedere tehnic, este posibil să atribui `undefined` oricărei variabile:

```js run
let x = 123;

x = undefined;

alert(x); // „undefined”
```

...Dar nu recomandăm asta. În mod normal, folosim `null` pentru a atribui o valoare de „necunoscut” sau „gol” unei variabile și `undefined` pentru verificări precum a vedea dacă unei variabile i-a fost atribuit ceva.

## Obiecte și simboluri

Tipul `obiect` este special.

Toate celelalte tipuri se numesc „primitive” pentru că valorile lor pot conține doar un lucru (fie un șir de caractere, un număr sau altceva). Spre deosebire de acestea, obiectele sunt folosite pentru a stoca colecții de date și entități mai complexe. Ne vom ocupa de ele în capitolul <info:object>, după ce învățăm mai multe despre primitive.

Tipul `simbol` este folosit pentru a crea identificatoare unice pentru obiecte. Îl menționăm aici pentru a completa pagina, dar îl vom studia după obiecte.

## Operatorul typeof [#type-typeof]

Operatorul `typeof` arată tipul elementului oferit ca parametru. Este folositor atunci când vrei să procesezi valori de tipuri diferite în moduri diferite sau doar dacă vrei să faci o scurtă verificare.

Există două sintaxe valabile:

1. Ca un operator: `typeof x`.
2. Ca o funcție: `typeof(x)`.

Cu alte cuvinte, funcționează cu sau fără paranteze. Rezultatul este același.

Invocarea funcției `typeof x` întoarce un șir de caractere care conține numele tipului:

```js
typeof undefined // "undefined"

typeof 0 // "number" (număr)

typeof true // "boolean"

typeof "foo" // "string" (șir de caractere)

typeof Symbol("id") // "symbol" (simbol)

*!*
typeof Math // "object"  (1) (obiect)
*/!*

*!*
typeof null // "object"  (2) (obiect)
*/!*

*!*
typeof alert // "function"  (3) (funcție)
*/!*
```

Ultimele trei rânduri au nevoie de mai multe explicații:

1. `Math` este un obiect inclus care oferă operații matematice. Vom învăța despre el în capitolul <info:number>. Aici, îl folosim doar ca exemplu de un obiect.
2. Rezultatul lui `typeof null` este `"object"`. Asta este o greșeală. Este o eroare oficial recunoscută a lui `typeof`, păstrată în scopuri de compatibilitate. Evident, `null` nu este un obiect. Este o valoare specială cu un tip special, propriu sie. Deci, din nou, aceasta este o eroare a limbajului.
3. Rezultatul lui `typeof alert` este `"function"`, deoarece `alert` este o funcție. Vom studia funcțiile în următoarele capitole unde vom și vedea că nu există un tip special „function” în JavaScript. Funcțiile aparțin tipului obiect. Dar `typeof` le tratează diferit, întorcând `"function"`. Asta nu este chiar corect, dar foarte convenabil în practică.


## Rezumat

Sunt 7 tipuri de date de bază în JavaScript.
- `number` pentru numere de orice tip: întregi sau zecimale.
- `string` pentru șiruri de caractere. Un șir de caractere poate avea unul sau mai multe caractere, nu există un tip separat pentru un singur caracter.
- `boolean` pentru date logice: `true` și `false`.
- `null` pentru valori necunoscute -- un tip de sine stătător care are o singură valoare, `null`.
- `undefined` pentru valori neatribuite -- un tip de sine stătător care are o singură valoare, `undefined`.
- `object` pentru structuri de date mai complexe.
- `symbol` pentru identificatori unici.

Operatorul `typeof` ne permite să vedem ce tip de date este stocat într-o variabilă.

- Două forme: `typeof x` sau `typeof(x)`.
- Întoarce un șir de caractere cu numele tipului, de exemplu `"string"`.
- Pentru `null` întoarce `"object"` -- aceasta este o eroare în limbaj, nu este de fapt un obiect.

În următoarele capitole, ne vom concentra pe valorile primitive și, odată ce ne familiarizăm cu ele, ne vom uita la obiecte.
