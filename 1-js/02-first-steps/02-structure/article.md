# Structura codului

Primele lucruri pe care le vom studia sunt blocurile de bază ale codului.

## Declarații

Declarațiile sunt construcții de sintaxă și comenzi care efectuează acțiuni.

Deja am întâlnit o declarație, `alert('Hello, world!')`, care afișează mesajul "Hello, world!".

Putem avea cât de multe declarații vrem în codul nostru. Declarațiile pot fi separate prin punct și virgulă.

De exemplu, aici vom despărți "Hello World" în două alerte diferite:

```js run no-beautify
alert('Hello'); alert('World');
```

De obicei, declarațiile sunt scrise pe linii separate pentru a face codul mai lizibil:

```js run no-beautify
alert('Hello');
alert('World');
```

## Punctul și virgula [#semicolon]

Punctul și virgula pot fi omise în majoritatea cazurilor când există o pauză de linie.

Acest lucru ar funcționa, de asemenea:

```js run no-beautify
alert('Hello')
alert('World')
```

Aici, JavaScript interpretează întreruperea liniei ca punct și virgulă „implicit”. Aceasta se numește [introducerea automata a punctului și virgulei](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**În cele mai multe cazuri, o linie nouă implică punct și virgulă. Dar „în majoritatea cazurilor” nu înseamnă „întotdeauna!**

Sunt cazuri când o linie nouă nu înseamna un punct și virgulă. De exemplu:

```js run no-beautify
alert(3 +
1
+ 2);
```

Codul va afișa `6` deoarece JavaScript nu inserează punct și virgulă aici. Este intuitiv evident că, dacă linia se termină cu un plus `"+"`, atunci este o "expresie incompletă", deci punctul si virgula nu este necesar. Și în acest caz, funcționează așa cum este intenționat

**Există situații în care JavaScript „eșuează” să-și asume un punct și virgulă unde este cu adevărat necesar.**

Erorile care apar în astfel de cazuri sunt destul de greu de găsit și de remediat.

````smart header="Exemplu de eroare"
Dacă sunteți curios să vedeți un exemplu concret de astfel de eroare, verificați acest cod:

```js run
[1, 2].forEach(alert)
```

Nu este nevoie să ne gândim încă la semnificația parantezelor `[]` și `forEach`. O să le studiem mai târziu. Deocamdată, amintiți-vă doar rezultatul codului: este afișat `1` apoi` 2`.

Acum, să adăugăm un `alert` înainte de cod și să *nu* încheiem cu un punct și virgulă:

```js run no-beautify
alert("Va apărea o eroare")

[1, 2].forEach(alert)
```

Acum dacă rulăm codul, doar primul `alert` este afișat iar apoi o să avem o eroare!

Dar totul este bine din nou dacă adăugăm un punct și virgulă după `alert`:
```js run
alert("Totul este bine acum");

[1, 2].forEach(alert)  
```

Acum o să avem mesajul "Totul este bine acum" urmat de `1` și `2`.


Eroarea din varianta fără punct și virgulă apare deoarece JavaScript nu își asumă punct și virgulă înainte de paranteze pătrate `[...]`.

Deci, pentru că punct și virgulă nu este inserat automat, codul din primul exemplu este tratat ca o singură instrucțiune. Iată cum îl vede motorul:

```js run no-beautify
alert("Va apărea o eroare")[1, 2].forEach(alert)
```

Dar ar trebui să fie două afirmații separate, nu una. O astfel de fuziune în acest caz este greșită, de unde și eroarea. Acest lucru se poate întâmpla în alte situații.
````

Vă recomandăm să puneți punct și virgulă între instrucțiuni, chiar dacă sunt separate prin linii noi. Această regulă este adoptată pe scară largă de comunitate. Să notăm încă o dată -- *este posibil* să omitem punctul și virgula de cele mai multe ori. Dar este mai sigur -- mai ales pentru un începător -- să o folosească.

## Comentarii

Pe măsură ce timpul trece, programele devin din ce în ce mai complexe. Devine necesar să adăugați *comentarii* care descriu ce face codul și de ce.

Comentariile pot fi puse în orice loc al unui script. Acestea nu afectează execuția acestuia, deoarece motorul pur și simplu le ignoră.

**Comentariile pe o singură linie încep cu două caractere de slash înainte `//`.**

Restul liniei este un comentariu. Poate ocupa o linie completă proprie sau poate urma o declarație.

Ca aici:
```js run
// Acest comentariu ocupă o linie proprie
alert('Hello');

alert('World'); // Acest comentariu urmează afirmația
```

**Comentariile pe mai multe linii încep cu un slash înainte și un asterisc <code>/&#42;</code> și se încheie cu un asterisc și cu un slash înainte <code>&#42;/</code>.**

În felul următor:

```js run
/* Un exemplu cu două mesaje.
Acesta este un comentariu pe mai multe linii.
*/
alert('Hello');
alert('World');
```

Conținutul comentariilor este ignorat, deci dacă punem cod în interior <code>/&#42; ... &#42;/</code>, acesta nu o să se execute.

Uneori, poate fi util să dezactivați temporar o parte a codului:

```js run
/* Comentând codul
alert('Hello');
*/
alert('World');
```

```smart header="Folosiți tastele rapide!"
În majoritatea editorilor, o linie de cod poate fi comentată apăsând tasta `key:Ctrl+/` pentru un comentariu pe o singură linie și `key:Ctrl+Shift+/` -- pentru comentarii pe mai multe linii (selectați o bucată de cod și apăsați tasta rapidă). Pentru Mac, încercați `key:Cmd` în loc de `key:Ctrl`.
```

````warn header="Comentariile imbricate nu sunt suportate!"
Nu poate exista `/*...*/` în interiorul altui `/*...*/`.

Acest cod va genera o eroare:

```js run no-beautify
/*
  /* comentariu imbricat ?!? */
*/
alert( 'World' );
```
````

Vă rugăm, nu ezitați să vă comentați codul.

Comentariile cresc amprenta generală a codului, dar aceasta nu este deloc o problemă. Există multe instrumente care reduc codul înainte de publicarea pe un server de producție. Șterg comentariile, deci nu apar în scripturile de lucru. Prin urmare comentariile nu au deloc efecte negative asupra producției.

Mai târziu în tutorial va exista un capitol  <info:code-quality> care explică, de asemenea, cum să scrieți comentarii mai bune.
