---
title: 'Aplikacja konkursowa: wstępny design'
id: 135
categories:
  - dajsiepoznac2017
date: 2017-03-09 20:19:30
tags:
---

Kolejny tydzień konkursu i kolejny post na temat konkursowej aplikacji, [którą bliżej opisałem w poprzednim poście](http://arkadiuszm.pl/2017/03/aplikacja-konkursowa-wtyczka-do-google-chrome/). W tym wpisie zaprezentuje wstępny mock design interfejsu wtyczki, który nie jest w żaden sposób rewolucyjny, ale myślę, że przelanie konceptu do Affinity Designera jest konieczne. Niestety nie jestem projektantem ani grafikiem, tak więc schemat graficzny jest daleki od ideału. Kolejnym problemem jest to, że nie mam jasno i konkretnie sprecyzowanych funkcji jakie rozszerzenie będzie oferować, poza ogólnym zamysłem.

Parę dni temu porozmawiałem przy piwie z moim dobrym kolegą, który dużo czasu spędza w sieci i na dodatek używa Google Chrome, więc jest dobrym materiałem na przyszłego alfa-testera wtyczki. Pomysł rozszerzenia średnio przypadł mu do gustu - stwierdził, że funkcje defaultowego Speed Diala w pełni mu wystarczą, a resztę załatwia pasek zakładek u góry. Obawiam się, że dużo użytkowników Chrome właśnie w ten sposób korzysta z oferowanych funkcji szybkiego wyboru nowej strony i że porwałem się z motyką na Słońce, ale skoro tego typu rozszerzenia istnieją i mają się dobrze, to chyba jednak temat nie jest wyczerpany. Wiem, że fachowo powinienem zaprojektować najpierw stronę graficzną, dopieścić ją w stu procentach i dopiero wtedy brać się za kodowanie, ale tak jak już mówiłem - jestem **tylko **developerem.

&nbsp;

### Wstępny design

&nbsp;

![](http://arkadiuszm.pl/wp-content/uploads/2017/03/simple-speed-dial-300x188.png)

&nbsp;

Jak widać - nic tu odkrywczego. Wypełniłem tylko dwa boxy ze stronami (wybaczcie lenistwo), w którym znajdują się dwa przyciski, które pojawiają się dopiero po najechaniu myszą na kafelke. Pierwszy do usuwania strony i drugi do edycji. Można tam zmienić adres strony lub kolor zakładki (nad tym jeszcze się zastanawiam). Na końcu listingu jest pole do dodawania nowej strony, do której możemy wpisać ręcznie adres lub wybrać z istniejących, zapisanych stron z zakładek.

![](http://arkadiuszm.pl/wp-content/uploads/2017/03/simple-speed-dial-2-300x188.png)

&nbsp;

Ciekawa rzecz dzieje się jeśli posiadamy małą ilość stron. Grid powinien dostosować się do rozmiaru okna przeglądarki zajmując całe puste miejsce. Po lewej stronie u góry będzie przycisk otwierający konfiguracje wtyczki, gdzie będziemy mogli ustalić np. kolor lub obrazek tła za kafelkami stron.

Nie zadecydowałem jeszcze w sprawie sidebara - czy jest on niezbędny czy wręcz przeciwnie. Znalazły by się tam np. feedy z RSS, poczta, pogoda, kursy walut czy wiadomości. Kod aplikacji powinien przewidywać taką opcję, ale w przypadku Vue nie powinno być problemu. Jeżeli okaże się, że z dodatkowymi bajerami szybkość działania rozszerzenia zauważalnie spadnie, skupie się na core features.

Za tydzień pierwszy konkretny commit z kodem. Stay tuned.