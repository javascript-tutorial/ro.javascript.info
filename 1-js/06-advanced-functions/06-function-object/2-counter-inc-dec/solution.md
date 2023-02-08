
Soluția folosește `count` în variabila locală, dar metodele de adăugare sunt scrise direct în `counter`. Acestea împart același mediu lexical extern și pot accesa de asemenea `count` curent.
