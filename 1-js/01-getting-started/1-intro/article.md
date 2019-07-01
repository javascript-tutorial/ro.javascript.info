# O introducere în JavaScript

Să vedem ce e atât de special la JavaScript, ce putem realiza cu el și ce alte tehnologii se înțeleg bine cu acesta.

## Ce este JavaScript?

*JavaScript* a fost creat inițial pentru *"a da viață paginilor"*.

În acest limbaj programele sunt numite *script-uri*(scripts). Acestea pot fi scrise direct în HTML și executate în mod automat pe măsură ce pagina se încarcă.

Script-urile sunt furnizate și executate ca și text simplu. Ele nu au nevoie de pregătire specială sau de compilare pentru a rula.

În ceea ce privește acest aspect, JavaScript este foarte diferit față de un alt limbaj cu nume asemănător, [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Why <u>Java</u>Script?"
Când JavaScript a fost creat, inițial avea un alt nume: "LiveScript". Dar la acel moment limbajul Java era foarte popular, așa s-a decis că poziționarea unui nou limbaj ca și "frate mai mic" al lui Java, va ajuta.

Dar cum acesta a evoluat, JavaScript a devenit un limbaj complet independent, cu propriile specificații, numite [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), iar acum nu mai are nici o legătură cu Java.
```

În prezent, JavaScript nu doar că poate executa în browser, dar de asemenea poate executa pe server, sau chiar pe orice dispozitiv care are un program special numit [ motorul JavaScript(the JavaScript engine)](https://en.wikipedia.org/wiki/JavaScript_engine).

Browser-ul are un motor încorporat, uneori denumit "mașină virtuală JavaScript"(JavaScript virtual machine).

Diferite motoare au diferite "nume de cod", spre exemplu:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- în Chrome și Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- în Firefox.
- ...Mai există și alte nume de cod precum "Trident" și "Chakra" pentru diferite versiuni de IE, "ChakraCore" pentru Microsoft Edge, "Nitro" și "SquirrelFish" pentru Safari, etc.

Termenii de mai sus sunt bine de știut, pentru că ei sunt folosiți în articole ale dezvoltatorilor, pe internet. De exemplu dacă "o caracteristică(feature) X este suportată de către V8", atunci probabil că merge și în Chrome și în Opera.

```smart header="How do engines work?"

Motoarele sunt complicate. Dar bazele sunt ușoare.

1. Motorul (încorporat, dacă este un browser) citește("parsează") script-ul.
2. Apoi convertește("compilează") script-ul în limbajul mașină.
3. Apoi codul mașină rulează, destul de repede.

Motorul aplică optimizări la fiecare stadiu al procesului. Ba chiar observă script-ul compilat cum rulează, analizează datele care trec prin el și aplică optimizări asupra codului mașină, bazate pe informațiile strânse. La sfârșit script-urile rulează destul de repede.
```

## Ce poate JavaScript-ul din browser să facă?

JavaScript-ul modern este un limbaj de programare "sigur". Nu furnizează acces low-level la memorie sau la CPU, pentru că inițial a fost creat pentru browsere, care nu necesitau acest lucru.

Capabilitățile depind mult de mediul în se care rulează JavaScript. De exemplu, [Node.JS](https://wikipedia.org/wiki/Node.js) suportă funcții care permit JavaScript-ului să citească/scrie fișiere arbitrare, să realizeze request-uri de rețea, etc.

Javascript-ul din browser poate face orice în legătură cu manipularea paginii web, interacțiunea cu utilizatorul, și cu serverul web.

De exemplu, JavaScript din browser este capabil să:

- Adauge HTML nou în pagină, schimbe  conținutul existent, modifice stiluri.
- Reacționeze la acțiunile utilizatorului, execute la click de mouse, mișcări ale cursorului, sau apăsări de taste.
- Trimită request-uri prin rețea către servere remote(la distanță), descarce și încarce fișiere (așa-numitele tehnologii [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) și [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Preia și să seteze cookie-uri, pună întrebări vizitatorului, arate mesaje.
- Să-și amintească date pe partea de client("local storage").

## Ce nu poate JavaScript-ul din browser să facă?

Abilitățile JavaScript-ului din browser sunt limitate pentru siguranța utilizatorului. Scopul este acela de a preveni o pagină web malițioasă să acceseze informații private sau să corupă datele utilizatorului.

Exemplele acestor restricții sunt:

- JavaScript, pe o pagină web, nu poate citi/scrie fișiere arbitrare pe hard disk, nu le poate copia sau să execute programe. Nu are acces direct la funcțiile sistemului de operare.

    Browserele moderne îi permit să lucreze cu fișiere, dar accesul este limitat și furnizat doar dacă utilizatorul realizează anumite acțiuni, cum ar fi "scăparea" unui fișier într-o fereastră de browser sau selectarea lui printr-un tag `<input>`.

    Există mijloace prin care se poate interacționa cu camera/microfonul sau alte dispozitive, dar ele necesită permisiunea explicită a utilizatorului. Așadar o pagină pe care este activat JavaScript-ul nu ar putea activa o cameră web în mod viclean, și să privească împrejurimile și să trimită informații către [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- În general, diferite tab-uri/ferestre nu știu nimic unele despre celelalte. Câteodată acestea știu, de exemplu când o fereastră folosește JavaScript pentru a deschide cealaltă fereastră. Dar chiar și în acest caz, JavaScript nu poate accesa cealaltă fereastră dacă ambele ferestre vin de pe site-uri diferite (de la un domeniu, protocol sau port diferit).

    Acest lucru se numește "Same Origin Policy"(politica aceleiași origini). Pentru a lucra în jurul acesteia, *ambele pagini* trebuie să conțină un cod special JavaScript care să administreze schimbul de date.

    Limitarea este din nou pentru siguranța utilizatorului. O pagină de la `http://anysite.com` pe care un utilizator a deschis-o nu trebuie să poată accesa alt tab al browser-ului cu URL-ul `http://gmail.com` și să fure informații de acolo.
- JavaScript poate cu ușurință să comunice pe net către server, de unde a venit pagina curentă. Dar abilitatea sa de a primi date de la alte site-uri/domenii este infirmată. Deși posibil, acesta necesită acord explicit(exprimat prin headere HTTP) din partea serverului de la distanță. Din nou, acestea sunt limitări de securitate.

![](limitations.png)

Astfel de limite nu există dacă JavaScript este folosit în afara browser-ului, de exemplu pe un server. Browserele moderne permit de asemenea instalarea plugin-urilor/extensiilor care pot cere extinderea permisiunilor.

## Ce face JavaScript, unic?

Sunt cel puțin *trei* lucruri imporante în legătură cu JavaScript:

```compare
+ Integrare completă cu HTML/CSS.
+ Lucrurile simple sunt făcute simplu.
+ Este suportat de către toate browserele majore și este activat în mod implicit.
```
JavaScript este singura tehnologie browser care combină aceste 3 lucruri.

Asta e ceea ce face JavaScript unic. De aceea este cea mai răspândită unealtă pentru crearea de interfețe pentru browser.

Pe parcursul planificării învățării unei noi tehnologii este benefic să verifici perspectivele acesteia. Așa că să trecem la trendurile moderne care includ noi limbaje și abilități ale browser-ului.


## Limbaje "pe" JavaScript

Sintaxa JavaScript-ului nu se potrivește cerințelor fiecăruia. Persoane diferite vor diferite feature-uri.

Acest lucru este de așteptat, pentru că proiectele și cerințele sunt diferite pentru fiecare.

Așa că recent a apărut o pletoră de limbaje noi, care sunt *transpilate*(convertite) în JavaScript, înainte ca ele să ruleze în browser.

Uneltele moderne fac transpilarea foarte rapidă și transparentă, permițând defapt dezvoltatorilor să codeze în alt limbaj și să auto convertească codul în cod "sub capotă"(under the hood).

Exemple de astfel de limbaje:

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) este un "zahăr sintactic" pentru JavaScript, el introduce sintaxă mai scurtă, permițând scrierea de cod mai clar și mai precis. De obicei este îndrăgit de către dezvoltatorii Ruby.
- [TypeScript](http://www.typescriptlang.org/) este concentrat pe adăugarea de "tipizare strictă de date", pentru a simplifica dezvoltarea și suportul sistemelor complexe. Este dezvoltat de Microsoft.
- [Dart](https://www.dartlang.org/) este un limbaj standalone care are propriul său motor care rulează în medii non-browser(precum aplicațiile mobile). A fost oferit inițial de către Google ca și un înlocuitor pentru JavaScript, dar de acum browserele necesită ca acesta să fie transpilat în JavaScript la fel ca cele de mai sus.

Există mai multe. Desigur, chiar dacă folosim unul dintre aceste limbaje, ar trebui de asemenea să știm JavaScript, pentru a înțelege cu adevărat ce facem.
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.

There are more. Of course, even if we use one of transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Rezumat

- JavaScript a fost creat inițial ca limbaj doar pentru browser(browser-only), dar acum este de asemenea folosit în multe alte medii.
- La momentul actual, JavaScript deține o poziție unică ca cel mai răspândit și adoptat limbaj browser cu integrare completă cu HTML/CSS.
- Există multe limbaje care sunt "transpilate" în JavaScript și furnizează anumite caracteristici. Este recomandat să arunci o privire peste ele, în linii mari, după ce stăpânești JavaScript.
