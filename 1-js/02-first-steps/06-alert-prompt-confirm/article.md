# Interacțiuni: alert, prompt, confirm

Deoarece vom folosi browserul ca mediu de demonstrație, hai să vedem câteva funcții cu care putem interacționa cu utilizatorul: `alert`, `prompt` și `confirm`

## alert

Pe aceasta am văzut-o deja. Ea afișează un mesaj și așteaptă ca utilizatorul să apese "OK".

De exemplu:

```js
alert("Salut");
```

Mini fereastra cu mesajul se numește *modal*. Cuvântul "modal" înseamnă că vizitatorul nu poate interacționa cu restul paginii, apăsa alte butoane, etc, până nu se ocupă de fereastră. În cazul de față - până nu apasă "OK".

## prompt

Funcția `prompt` acceptă două argumente:

```js
rezultat = prompt(titlu, [default]);
```

Aceasta afișează un modal cu un mesaj text, un câmp de introducere text pentru utilizator și butoanele OK/Anulează.

`titlu`
: Textul afișat utilizatorului.

`default`
: Un al doilea parametru, opțional, reprezintă valoarea inițială pentru câmpul de introducere text.

```smart header="Parantezele drepte din sintaxa `[...]`"
Parantezele drepte din jurul cuvântului `default` în sintaxa de mai sus denotă faptul că parametrul este opțional, nu obligatoriu.

```

Utilizatorul poate scrie ceva în prompt și poate apăsa OK. Apoi noi primim acel text în `rezultat`. Sau poate anula introducerea de text prin apăsarea butonului Anulează sau apăsarea tastei `key:Esc`, apoi noi primim `null` ca `rezultat`

Apelarea funcției `prompt` returnează textul din câmpul de introducere text sau `null` dacă introducerea de text a fost anulată.

De exemplu:

```js run
let vârstă = prompt('Câți ani ai?', 100);

alert(`Ai ${vârstă} de ani!`); // Ai 100 de ani!
```

````warn header="Pentru Internet Explorer: mereu dă o valoare parametrului `default`"
Al doilea parametru e opțional, dar dacă nu-i dăm nici-o valoare, Internet Explorer va insera textul `"undefined"` în prompt.

Rulează acest cod în Internet Explorer ca să vezi:

```js
let test = prompt("Test");
```

Așadar, pentru ca prompt-ul să funcționeze corect și în Internet Explorer, recomandăm ca mereu să folosești și al doilea argument:

```js
let test = prompt("Test", ""); // <-- pentru Internet Explorer
```

````

## confirm

Sintaxa:

```js
rezultat = confirm(întrebare);
```

Funcția `confirm` afișează un modal cu o `întrebare` și două butoane: OK și Anulează.

Rezultatul este `true` dacă utilizatorul apasă OK și `false` în caz contrar.

De exemplu:

```js run
let estePatron = confirm("Ești patronul?");

alert(estePatron); // true dacă se apasă pe OK
```

## Rezumat

Am vorbit despre 3 funcții specifice browserului pentru a interacționa cu utilizatorii:

`alert`
: afișează un mesaj.

`prompt`
: afișează un mesaj cerându-i utilizatorului să introducă text. Returnează textul sau, dacă este apăsat butonul Anulează sau tasta `key:Esc`, `null`.

`confirm`
: afișează un mesaj și așteaptă ca utilizatorul să apese "OK" sau "Anulează". Returnează `true` dacă este apăsat OK și `false` dacă este apăsat Anulează/`key:Esc`.

Toate aceste metode sunt modale: ele opresc execuția codului și nu permit utilizatorului să interacționeze cu restul paginii până când fereastra a fost închisă.

Există două limitări comune între toate metodele de mai sus:

1. Locația exactă a modalului este determinată de browser. De obicei, e în centrul ferestrei.
2. Aspectul exact al modalului depinde tot de browser. Nu îl putem schimba.

Acesta este prețul plătit pentru simplitate. Sunt și alte moduri de a afișa ferestre mai frumoase și interacțiuni mai complexe cu utilizatorul, dar dacă "brizbrizurile" nu contează atât de mult pentru tine, aceste metode merg de minune.
```
````
