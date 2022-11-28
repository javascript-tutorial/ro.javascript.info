# Operatori de bază, matematică.

Cunoaștem mulți operatori din școala. Ei sunt lucruri ca adunarea `+`, înmulțirea `+`, scăderea `-`, și așa mai departe.

În acest capitol, vom începe cu operatori simplii, apoi o să ne concentrăm pe aspectele specifice JavaScript, ce nu sunt acoperite de aritmetica școlară. 

## Termeni: "unar", "binar", "operand"

Înainte să trecem mai departe, să înțelegem terminologia comună.

- *Un operand* -- este ceea ce operatorile le este aplicat. De exemplu, în înmulțirea `5 * 2` sunt 2 operanzi: operandul stâng este `5` și operandul drept este `2`. Câteodată, oamenii le numesc "argumente" în loc de "operanzi".
- Un operator este *unar* daca are un singur operand. De exemplu, negația unară `-` schimbă semnul unui număr:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, negația unară a fost aplicată
    ```
- Un opereator este *binar* daca are doi operanzi. Același minus existe în binar de asemenea:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, minusul binar scade valorile
    ```

    Formal, in exemplele de mai sus avem doi operatori diferiti ce împart același simbol: operatorul negatiei, oeprator unar ce inversează semnul, și operatorul scăderii, operator binar ce scade un număr din altul.
    
## Matematică

Următoarele operații matematice sunt suportate:

- Adunare `+`,
- Scădere `-`,
- Înmulțire `*`,
- Împărțire `/`,
- Rest `%`,
- Exponențial `**`.

Primele patru sunt simple, în timp ce `%` și `**` au nevoie de câteva cuvinte despre ele.

### Rest %

Operatorul restului `%`, în ciuda aparenței, nu este înrudit cu procentele.

Result `a % b` este [restul](https://en.wikipedia.org/wiki/Remainder) împărțirii lui `a` la `b`.

De exemplu:

```js run
alert( 5 % 2 ); // 1, restul împărțirii lui 5 la 2
alert( 8 % 3 ); // 2, restul împărțirii lui 8 la 3
```

### Putere **

Puterea operatorului `a ** b` ridică `a` la puterea lui `b`.

În matematica școlară, este scrisă ca și a<sup>b</sup>.

De exemplu:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Exact ca și în amtematică, puterea operatorului este definită și pentru numerele non-integer.
De exemplu, rădăcina pătrată este o putere la  ½:

```js run
alert( 4 ** (1/2) ); // 2 (puterea lui 1/2 este aceași cu rădăcina pătrată)
alert( 8 ** (1/3) ); // 2 (puterea lui 1/3 este aceeași cu rădăcina cubică)
```


## Concatenarea șirului cu binarul +

Să cunoaștem carecteristicile operatorilor JavaScript ce sunt dincolo de aritmetica școlară.

De obicei, operatourl plus `+` adună numerele.

Dar, dacă binarul `+` este aplicat șirurilor, le alipește (concetenează):

```js
let s = "șirul" + "meu";
alert(s); // șirulmeu
```

De notat daca unul dintre opranzi este un șir, atunci celălalt este converit la șir de asemenea.

De exemplu:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Vezi, nu contează dacă primul sau al doilea operand este un șir.

Aici este un exemplu mai complex:

```js run
alert(2 + 2 + '1' ); // "41" și nu "221"
```

Aici, operatorii lucrează unul după celălalt. Primul `+` adună cele două numere, deci o sa afișeze `4`, apoi următorul `+` adaugă șirul `1` la el, deci este ca și `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" și nu "14"
```
Aici, primul operand este un șir, coompilatorul tratează ceilalți doi operanzi ca șiruri de asemenea. `2` este concatenat la `'1'`, deci este ca și `'1' + 2 = "12"` și `"12" + 2 = "122"`.

Binarul `+` este singurul operator care suportă șiruri în așa fel. Alți operatori aritmetici funcționeaza doar cu numere si convertesc mereu operanzii în numere.

Aici este un demo pentru scădere și împărțire:

```js run
alert( 6 - '2' ); // 4, convertește '2' la un număr
alert( '6' / '2' ); // 3, convertește ambii operanzi la numere
```

## Conversii numerice, unarul +

Plusul `+` există în două forme: forma binară pe care am folosit-o mai sus si forma unara.

Plusul unar sau, în alte cuvinte, operatorul plus `+` aplicat unei singure valori, nu face nimic numerelor. Dar daca operandul nu este un număr, plusul unar îl convertește într-un număr.

De exemplu:

```js run
// Niciun efect asupra numerelor
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Convertește non-numerele
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

De fapt, face același lucur ca și `Number(...)`, dar este mai scurt.

Nevoia de conversie a șirurilor în numere apare foarte des. De exemplu, dacă primim valori din campurile unui formular HTML, ele sunt de obicei șiruri. Ce facem dacă dorim sa le însumăm?

Plusul binar le va aduna ca și șiruri:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", plusul binar concatenează sirurile 
```

Dacă dorim să le tratăm ca și numere, avem nevoie sa le convertim, apoi să le însumăm:

```js run
let apples = "2";
let oranges = "3";

*!*
// ambele valori convertite în numere înainte de plusul binar
alert( +apples + +oranges ); // 5
*/!*

// varianta mai lungă
// alert( Number(apples) + Number(oranges) ); // 5
```

Din punctul de vedere al unui matematician, abundența de plusuri poate părea ciudată. Dar din punctul de vedere al unui progamator, nu este nimci special: plusurile unare sunt aplicate întâi, apoi convertite șirurile în numere, apoi plusul binar le însumează.

De ce atâtea plusuri unare sunt aplicate valorilor înaintea celor bianre? Așa cum vom vedea, datorită *precedenței mai mare*.

## Precedența operatorilor

Daca o expresie are mai mult de un operator, ordinea de execuție este definită de *precedența* lor, sau, în alte cuvinte, ordinea de prioritate implicită a operatorilor.

Din scoală, toți știm că înmultirea din expresia `1 + 2 * 2` ar trebui calculată înainte de adunare. Aceasta este exact lucrul cu precedența. Înmulțirea are *o precedență mai mare* decât aduanrea.

Parantezele trec peste orice precedență, deci daca nu suntem satisfăcuti cu ordinea inițială, le putem folosi pentru a o schimba. De exemplu, poate fi scris `(1 + 2) * 2`.

Sunt mulți operatori în JavaScript. Fiecare operator are un număr de precedență corespunzător. Cel cu numărul mai mare este executat întâi. Dacă precedența este aceaași, ordinea de execuție este de la stânga la dreapta.

Aici este un fragment din [tabelul precedenței](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (nu trebuie să-ți amintești asta, dar amintește-ți că operatorii unari sunat mai mari decât cei binari corespunzători):

| Precedență    | Nume          | Semn |
|---------------|---------------|------|
| ...           | ...           | ... |
| 15            | plus unar     | `+` |
| 15            | negație unară | `-` |
| 14            | putere        | `**` |
| 13            | înmulțire     | `*` |
| 13            | împărțire     | `/` |
| 12            | adunare       | `+` |
| 12            | scădere       | `-` |
| ...           | ...           | ... |
| 2             | atribuire     | `=` |
| ...           | ...           | ... |

Așa cum putem vedea, "plusul binar" are o prioritate de `15` cea ce este mai mare decât `12` de la "adunare" (plus binar). De aceea, în expresia `"+apples + +oranges"`, plusurile uanre acționează înainte de adunare.

## Atribuire

Să notăm că o atribuire `=` este de asemenea un operator. Este listat în tabelul de precedență cu o prioritate foarte mică de `2`.

De aceea, când atribuim o variabilă, ca și `x = 2 * 2 + 1`, operațiile sunt făcute întâi apoi `=` este evaluat, stocând resultatul în `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Atribuire = returnează o valoare

Faptul că `=` fiind un operator, nu constructor "magic" de limbaj are o implicație interesantă.

Toți operatorii JavaScript returnează o valoare. Asta este evident pentru `+` and `-`, de asemenea adevărat pentru `=`.

Apelul  `x = value` scrie `value` into `x` *apoi o returnează*. 

Aici este un demo ce foloseste o atribuire ca parte dintr-o expresie mai complexă:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

În exemplu de mai sus, rezultatul expresiei `(a = b + 1)` este valoare atribuită lui `a` (care este `3`). Este folosită apoi pentru evaluări ulterioare.

Amuzant cod, nu-i așa? Ar trebui să întelegem cum funcționează, pentru că uneori îl vedem in librăriile JavaScript.

Totuși, te rog să nu scrii codul așa. Aceste trucuri cu siguranță ca nu fac codul mai clar sau lizibil.

### Înlănțuirea atribuirilor

Altă caracteristică interesantă este abilitatea de a înlănțui atribuiri

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Aribuirile înlănțuite evaluează de la dreapta la stânga. Prima dată, expresia cea mai din dreapta `2 + 2` este evaluată apoi atribuită către variabilele din stânga `c`, `b` și `a`. La sfârșit, toate variabilele împart o singură valoare.

Din nou, pentru scopuri de lizibilitate este mai bine să impărțim acel cod in mai multe linii:

```js
c = 2 + 2;
b = c;
a = c;
```
Este mai ușor de citit, în special pentru scanarea rapidă a codului.

## Modificarea-pe-loc

De multe ori aplicăm un opereator unei variabile si stocăm noul rezultat în aceeasi variabilă.

De exemplu:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Această notație poate fi scurtată folosind operatorii `+=` și `*=`:

```js run
let n = 2;
n += 5; // acum n = 7 (exact ca în n = n + 5)
n *= 2; // acum n = 14 (exact ca în n = n * 2)

alert( n ); // 14
```

Operatorii scurți "modifică-și-atribuie" există pentru toți operatorii aritmetici si pe biți: `/=`, `-=`, etc.

Acești operatori au aceeași precedență ca și o atribuire normală, așa că acționează după majoritatea calculelor:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (partea din dreapta evaluată întâi, exact ca în n*= 8) 
```

## Increment/decrement
## Incrementare/decrementare

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Crescand sau scazând un number cu unu este printre cele mai comune operații numerice.

Deci, există operatori speciali pentru ea:

- **Incrementare** `++` crește o variabilă cu 1:
    ```js run no-beautify
    let counter = 2;
    counter++;        // functionează la fel ca și counter = counter + 1, dar este mai scurt
    alert( counter ); // 3
    ```
- **Decrementare** `--` scade o variabilă cu 1:
    ```js run no-beautify
    let counter = 2;
    counter--;        // functionează la fel ca și counter = counter - 1, dar este mai scurt
    alert( counter ); // 1
    ```

```warn
Incrementarea/decrementarea poate fi aplicată doar variabilelor. Încercand folosirea lor in valori ca și `5++` va produce o eroare.
```

Operatorii `++` și `--` pot fi plasați fie înainte sau după o variabilă

- Când operatorul este după variabilă, se află în "forma prefixă": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.
- "Forma prefixă" este atunci când operatorul este înainte de variabilă `++counter`.
Ambele declarații fac același lucru: crește `counter` cu `1`.

Există vreo diferență? Da, dar o putem vedea doar dacă valoarea returnată a lui `++/--`.

Să clarificăm. Așa cum știm, toți operatorii returnează o valoare. Incrementarea/decrementarea nu este o excepție. Forma prefixă retrunează o nouă valoare, în timp ce forma sufixă returnează valoarea veche (anterioară incrementării/decrementării).

Pentru a vedea diferența, aici este un exemplu:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

În linia `(*)`, forma *prefixă* `++counter` incrementează `counter` și returnează noua valoare, `2`. Deci, `alert` arată `2`.

Acum, să folosim forma sufixă:

```js run
let counter = 1;
let a = counter++; // (*) schimbat ++counter în counter++

alert(a); // *!*1*/!*
```

În linia `(*)`, forma *sufixă* `counter++` de asemenea incrementează `counter` dar returnează valoarea *veche* (prioritar incrementării). Deci, `alert` arată `1`.

Pentru a rezuma:

- Dacă rezultatul incrementării/decrementării nu este folosit, nu este nicio diferență in ce formă sa fie folosită:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, liniile de deasupra fac același lucru
    ```
- Dacă dorim sa incrementăm o valoare *și* imediat să folosim rezultatul operatorului, avem nevoie de forma prefixă:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Dacă dorim sa incrementăm o valoare dar să folosim valoarea ei anterioară, avem nevoie de forma prefixă:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
Operatorii `++/--` pot fi folosiți înăuntrul expresiei de asemenea. Precedența lor este mai mare decât majoritatea operațiilor aritmetice.

De exemplu:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Comparând cu:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, deoarece counter++ returnează valoare "veche" 

Desi ok din punct de vedere tehnic, aceasta notație face codul mai puțin lizibil de obicei. O linie face mai multe lucru -- nu este bine.

Cât timpul codul este citit, o scanare "verticală" poate rata foarte ușor ceva ca și `counter++` și nu va fi atât de evident că variabila a crescut.

Sfătuim un stil de "o linie -- o acțiune":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operatori pe biți


Operatorii pe biți tratează argumentele ca si numere integer pe 32-biți și funcționeaza pe nivelul representației lor binară.

Acești operatori nu sunt specifici JavaScript. Ei sunt suportați în majoritatea limbajelor de programare.

Lista operatorilor:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Acești operatori sunt folosiți foarte rar, atunci când trebuie sa ne jucăm cu numerele la cel mai mic nivel (pe biti). Nu avem nevoie de acești operatori curând, întrucât sunt foarte puțin folosiți în web development, dar în unele zone speciale, ca și criptografia, sunt de ajutor. Poti citi capitolul [Operatorii pe Biți](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) pe MDN când este nevoie.

## Virgulă

Operatorul virgulă `,` este unul dintre cele mai rare si mai neobișnuite operatoare. Câteodată, este folosit pentru a scrie cod mai scurt, deci trebui sa o știm pentru a ințelege ce se întâmplă.

Operatorul virgulă ne permite să evaluăm mai multe expresii, împărțindu-le cu o virgula `,`. Fiecare dintre eacestea sunt evaluate doar un singur rezultat fiind returnat.

De exemplu:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (rezultatul 3 + 4)
```

Aici, prima expresie `1 + 2` este evaluat și rezultatul său este aruncat, Apoi, `3 + 4` este evaluat si returnat ca și rezultat.

```smart header="Comma has a very low precedence"
Vă rugăm sa notați ca operatorul virgulă are o precedență foarte joasă, mai joasă decât `=`, deci parantezele sunt importante in exemplul de mai sus.

Fără ele: `a = 1 + 2, 3 + 4` evaluează `+` intâi, însumând numerele în `a = 3, 7`, apoi operatorul `=` atribuie `a = 3`, iar restul este ignorat. Este ca și `(a = 1 + 2), 3 + 4`.
```

De ce avem nevoie de un operat care aruncă totul exceptând ultima expresie?

Câteodată, oamenii îl folosesc in construcții mai complexe pentru a pune mai multe acțiuni pe aceeași linie.

De exemplu:

```js
// trei operații pe aceeași linie
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Aceste trucuri sunt folosite în multe framework-uri de JavaScript. De aceea le menționăm. De obicei ele nu cresc lizibilitatea codului deci ar trebui să ne gândim bine înainte să le folosim.
