
# Manuale și specificații

Această carte este un *tutorial*. Are ca obiectiv să te ajute să înveți treptat limbajul. Dar odată ce ești familiarizat cu principiile de bază, vei avea nevoie de alte surse.

## Specificații

**Specificația ECMA-262** conține cea mai în profunzime, detaliată și formalizată informație despre JavaScript. Aceasta definește limbajul.

Dar fiind atât de formalizată, este grea de înțeles la început. Deci dacă ai nevoie de cea mai de încredere sursă de informație despre detaliile limbajului, specificațiile sunt locul potrivit. Dar nu sunt pentru uzul obișnuit.

Ultima schiță este la <https://tc39.es/ecma262/>.

Pentru a citi despre noile caracteristici avansate, incluzând acelea care sunt "aproape standard" (așa-numita "etapă a treia"), vezi propunerile la <https://github.com/tc39/proposals>.

De asemenea, dacă programezi pentru browser, atunci sunt și alte specificații care sunt abordate în [partea a doua](info:browser-environment) a tutorialului.

## Manuale

- **MDN (Mozilla) JavaScript Reference** este un manual cu exemple și alte informații. Este bun pentru a obține informații mult mai profunde despre funcții individuale ale limbajului, metode etc.

    Poate fi găsit la <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

    Deși, adeseori cel mai bine este să cauți pe internet. Doar folosește "MDN [term]" în query, e.g. <https://google.com/search?q=MDN+parseInt> pentru a căuta funcția `parseInt`.


<<<<<<< HEAD
- **MSDN** – manual de la Microsoft cu o multitudine de informații, inclusiv JavaScript (adeseori menționat ca JScript). Dacă cineva are nevoie de ceva specific pentru Internet Explorer, cel mai bine este să vadă: <http://msdn.microsoft.com/>.
    
    De asemenea, putem căuta pe internet fraze de genul "RegExp MSDN" or "RegExp MSDN jscript".
=======
- **MSDN** – Microsoft manual with a lot of information, including JavaScript (often referred to as JScript). If one needs something specific to Internet Explorer, better go there: <http://msdn.microsoft.com/>.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

## Tabele de compatibilitate

JavaScipt este un limbaj în dezvoltare, noi caracteristici fiind adăugate regulat.

Pentru a vedea suportul acestora printre browsere și alte motoare vezi:

- <http://caniuse.com> - tabele pentru suport per-caracteristică, e.g. pentru a vedea ce motoare suportă funcțiile moderne de criptografie: <http://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - un tabel cu caracteristicile limbajului și motoarele ce le suportă sau nu.

Toate aceste resurse sunt utile de în dezvoltarea din viața reală, conținând informații valoroase despre detaliile limbajului, suportul acestora etc.

Te rugăm să îți amintești de ele (sau de acestă pagină) pentru cazurile în care ai nevoie de informații mai profunde despre o caracteristică particulară.
