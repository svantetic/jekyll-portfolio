---
title: 'Droga do pierwszej pracy: #5 - praktyki i finisz'
id: 284
layout: post
categories:
  - dajsiepoznac2017
date: 2017-05-31 12:07:10
tags:
---

Przez kłopoty finansowe otarłem się o roznoszenie ulotek i prace na eventach w Krakowie. Z perspektywy czasu bardzo ciesze się, że jednak tak się nie stało i postanowiłem mimo przeciwności nadal dążyć do celu i po około 6 - 8 miesiącach nauki przeplatanej wszelakiej maści przerwami, zniechęceniami i nieudanymi próbami dostania się na jakikolwiek staż postanowiłem pójść na darmowe, dwumiesięczne praktyki do firmy w centrum Krakowa.

W poprzednim odcinku napisałem, że po krótkiej rozmowie na tematy związane z CSSem otrzymałem zadanie testowe polegające na zakodowaniu prostego landing-page z pliku .PNG. Jedynym problemem były charakterystyczne skosy spotykane często na przeróżnych stronach, które można zrobić na dwa, a nawet trzy sposoby

- Wyciąć lub w przypadku braku pliku .PSD narysować trójkątne tło
- Skorzystać z pseudoelementów :before i :after do stworzenia borderów symulujących trójkąt
- Użyć transform: skew lub transform: rotate.

Najprostszym sposobem oczywiście był ten pierwszy, ale chcąc pokazać się z dobrej strony postanowiłem zrobić to za pomocą trzeciego sposobu.
Problemy pojawiły się przy wersji mobilnej, bo odpowiednie wyliczenie szerokości, wysokości i stopnia obrócenia elementu było kłopotliwe. Niemniej jednak zadanie przeszło weryfikacje i zaraz po nowym roku 2016 zacząłem praktyki.
Na czym one polegały?

W ciągu tygodnia musiałem być tam 20 godzin, czyli zazwyczaj przychodziłem na 4 godziny, tak wiec bez problemu mogłem połączyć to ze studiami. Na pierwszy ogień dostałem do poprawki landing page na Wordpressowej stronie i zakodowanie drugiego, bardzo podobnego. Kolejnymi zadaniami były głównie poprawki bądź kodowanie od zera jakiegoś layoutu dla aplikacji webowej wyświetlających dane na wykresie za pomocą biblioteki chartist.js.
Czy nauczyłem się czegoś podczas tego dwumiesięcznego okresu?

Oczywiście. Po raz pierwszy miałem styczność z pracą dla konkretnego klienta w zespole, z rozwiązywaniem realnych problemów i mimo wszystko presją czasu, ponieważ zadanie należało wykonać do określonego terminu. Dodatkowo systematyczność pracy, przychodzenie na konkretną godzinę, codzienna styczność z kodem różnej jakości jeżeli nawet nie miało się ochoty nic tworzyć. Oprócz tego czytanie lub pisanie dokumentacji i wdrożenie się w projekt pisany przez kogoś innego. Zdarzały się też nudne i żmudne zadania jak pomoc z tłumaczeniem plików layoutu w Androidzie czy szukanie jakiejś biblioteki PHP (mimo, że moim stanowiskiem był front end intern), ale większość projektów była zazwyczaj ciekawa jak dla kogoś, kto nie ma komercyjnego doświadczenia.
Minusem był brak styczności z JavaScriptem, którego zawsze uważałem za priorytet w nauce i średnia komunikacja w zespole. Czasami nie dostawałem żadnych zadań, zespół robił swoje rzeczy, wtedy wchodziłem na reddita i czytałem newsy ze świata webdevu.

Mimo to wyniosłem z pierwszej niby-pracy bardzo cenne doświadczenia a przede wszystkim pewność, że poradzę sobie na takim stanowisku w innej firmie. Jeżeli ktoś nie czuje się na siłach lub wie, że nie umie wystarczająco dużo aby iść na swój pierwszy etat jako front-end, studiuje i nie ma zbytnich problemów natury finansowej to polecam sprawdzić się w taki właśnie sposób.

Po dwóch miesiącach zrządzeniem losu trafiłem do innej firmy, w której z miejsca wskoczyłem na stanowisko zajmowane przez wspominanego tutaj wielokrotnie kolegę. Zadaniem testowym było zakodowanie layoutu z .PSD, z którym uwinąłem się ponoć w rekordowym tempie plus napisanie prostego, analogowego zegarka w JSie i CSSie, które również ukończyłem. Wymagany stack technologiczny był praktycznie żaden, ale jak na pierwszą pracę nie było na co narzekać. Pod opiekę dostałem aplikacje webową pisaną w AngularJS. Kod był niestety bardzo słabej jakości, a plątanina $scopów i jQuery doprowadzała mnie do białej gorączki. Zadania, które dostawałem na początku opierały się na prostych poprawkach w kodzie. Po kilku miesiącach w firmie postanowiliśmy przepisać tą aplikację od zera na framework VueJS i było to bardzo dobre posunięcie. W międzyczasie dostałem pod opiekę stronę dla klienta postawioną na CMSie HubSpot. O HubSpocie napiszę przy innej okazji - na ten moment wystarczy powiedzieć, że pisanie stron pod ten system jest w głównej mierze walką z oprogramowaniem, skryptami i ograniczeniami HubSpota, oraz pisanie różnej maści hacków, które pozwalają zastosować coś, co nie zostało przewidziane przez jego twórców.

Seria dobiega końca, jeżeli wytrwałeś do samego końca to dzięki. Mam nadzieję, że ukazałem wszystkie meandry nauki front endu / programowania z perspektywy początkującego developera. Skupiłem się na tych najważniejszych etapach abyś mógł wynieść z tego dla siebie.

Jaki jest morał tej całej opowieści?

Bardzo banalny. Jeżeli wyznaczysz sobie cel do zrealizowania - po prostu dąż do tego i nie przejmuj się niczym co staje ci na drodze. Jeśli nie masz czy twoje skille są na wystarczającym poziomie - zgłoś się do firmy i wystartuj w rekrutacji, pójdź na rozmowę. Niedocenianie swoich umiejętności to bardzo często spotykane zjawisko. Przecenianie również.

Co bym zmienił, gdybym mógł się cofnąć?

Przede wszystkim nie rozdrabniałbym się na inne języki programowania. Wybrałbym sobie JS lub Jave i szkolił się w wąskiej dziedzinie jednocześnie poznając powierzchownie inne rozwiązania. Nie tykałbym jQuery do prostych projektów - więcej czasu poświęciłbym na czysty JavaScript ponieważ to prędzej czy później się zemści. A co do tego - w kolejnym wpisie dotyczącym rozmów rekrutacyjnych.