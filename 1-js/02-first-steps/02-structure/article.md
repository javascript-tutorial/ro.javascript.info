# Structura codului

Primele lucruri pe care le vom studia sunt blocurile de bază ale codului.

## Declarații

Declarațiile sunt construcții de sintaxă și comenzi care efectuează acțiuni.

Deja am întâlnit o declarație, `alert('Hello, world!')`, care afișează mesajul "Hello, world!".

Putem avea cât de multe declarații vrem în codul nostru. Declarațiile pot fi separate prin punct și virgulă.

De exemplu, aici vom despărți "Hello World" în două alerte:

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

Asta ar funcționa la fel:

```js run no-beautify
alert('Hello')
alert('World')
```

Aici, JavaScript interpretează întreruperea liniei ca punct și virgulă „implicit”. Asta se numește [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**În cele mai multe cazuri, o linie nouă implică punct și virgulă. Dar „în majoritatea cazurilor” nu înseamnă "întotdeauna"!**

Sunt cazuri când o linie nouă nu înseamnă un punct și virgulă. De exemplu:

```js run no-beautify
alert(3 +
1
+ 2);
```

Codul produce `6` pentru că JavaScript nu introduce punct și virgulă aici. Este intuitiv evidend că dacă linia se termină cu un plus `"+"`, apoi este o "expresie incompletă", deci un punc și virgulă acolo ar fi incorect. Iar în acest caz, asta funcționează cum trebuie.

**Există situații în care JavaScript „eșuează” să-și asume un punct și virgulă unde este cu adevărat necesar.**

Erorile care apar în astfel de cazuri sunt destul de greu de găsit și de remediat.

````smart header="Exemplu de eroare"
Dacă sunteți curios să vedeți un exemplu concret de astfel de eroare, verificați acest cod:

```js run
alert("Salut");

[1, 2].forEach(alert);
```

Nu este nevoie să vă gândiți încă la semnificația parantezelor `[]` și `forEach`. Le vom studia mai târziu. Deocamdată, amintiți-vă doar rezultatul executării codului: apare `Salut`, apoi `1`, apoi `2`.

Acum să eliminăm punctul și virgula de după `alert`:

```js run no-beautify
alert("Salut")

[1, 2].forEach(alert);
```

Diferența față de codul de mai sus este de un singur caracter: punctul și virgula de la sfârșitul primei linii a dispărut.

Dacă rulăm acest cod, apare doar primul `Hello` (și există o eroare, poate fi necesar să deschideți consola pentru a o vedea). Nu mai există niciun număr.

Asta pentru că JavaScript nu presupune un punct și virgulă înaintea parantezelor pătrate `[...]`. Așadar, codul din ultimul exemplu este tratat ca o singură instrucțiune.

Așa e cum îl vede motorul:

```js run no-beautify
alert("Salut")[1, 2].forEach(alert);
```

Arată ciudat, nu? O astfel de fuziune în acest caz este pur și simplu greșită. Trebuie să punem un punct și virgulă după `alert` pentru ca codul să funcționeze corect.

Acest lucru se poate întâmpla și în alte situații.
````

Vă recomandăm să puneți punct și virgulă între instrucțiuni, chiar dacă sunt separate prin linii noi. Această regulă este adoptată pe scară largă de comunitate. Să notăm încă o dată -- *este posibil* să omitem punctul și virgula de cele mai multe ori. Dar este mai sigur -- în special pentru un începător -- să o folosească.

## Comments [#code-comments]

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

Uneori poate fi util să dezactivați temporar o parte a codului:

```js run
/* Comentând codul
alert('Hello');
*/
alert('World');
```

```smart header="Use hotkeys!"
În majoritatea editorilor, o linie de cod poate fi comentată prin apăsarea tastei de acces rapid `key:Ctrl+/` pentru un comentariu pe o singură linie și ceva de genul `key:Ctrl+Shift+/` -- pentru comentarii pe mai multe linii (selectați o bucată de cod și apăsați tasta de acces rapid). Pentru Mac, încercați `key:Cmd` în loc de `key:Ctrl` și `key:Option` în loc de `key:Shift`.
```

````warn header="Comentariile nested nu sunt suportate!"
Nu poate exista `/*...*/` în interiorul altui `/*...*/`.

Acest cod va genera o eroare:

```js run no-beautify
/*
  /* comentariu imbricat ?!? */
*/
alert( 'Lume' );
```
````

Vă rugăm, nu ezitați să vă comentați codul.

Comentariile cresc amprenta generală a codului, dar aceasta nu este deloc o problemă. Există multe instrumente care micșorează codul înainte de publicarea pe un server de producție. Șterg comentariile, deci nu apar în scripturile de lucru. Prin urmare comentariile nu au deloc efecte negative asupra producției.

Mai târziu în tutorial va exista un capitol  <info:code-quality> care explică, de asemenea, cum să scrieți comentarii mai bune.
