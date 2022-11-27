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


The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there would be incorrect. And in this case, that works as intended.

**Există situații în care JavaScript „eșuează” să-și asume un punct și virgulă unde este cu adevărat necesar.**

Erorile care apar în astfel de cazuri sunt destul de greu de găsit și de remediat.

````smart header="Exemplu de eroare"
Dacă sunteți curios să vedeți un exemplu concret de astfel de eroare, verificați acest cod:

```js run
alert("Hello");

[1, 2].forEach(alert);
```

No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let's remove the semicolon after the `alert`:

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
```

The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.

If we run this code, only the first `Hello` shows (and there's an error, you may need to open the console to see it). There are no numbers any more.

That's because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here's how the engine sees it:

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.

````

Vă recomandăm să puneți punct și virgulă între instrucțiuni, chiar dacă sunt separate prin linii noi. Această regulă este adoptată pe scară largă de comunitate. Să notăm încă o dată -- *este posibil* să omitem punctul și virgula de cele mai multe ori. Dar este mai sigur -- mai ales pentru un începător -- să o folosească.


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

Uneori, poate fi util să dezactivați temporar o parte a codului:

```js run
/* Comentând codul
alert('Hello');
*/
alert('World');
```


```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
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
