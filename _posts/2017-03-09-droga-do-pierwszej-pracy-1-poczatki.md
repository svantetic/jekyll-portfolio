---
title: 'Droga do pierwszej pracy #1: Początki'
id: 146
layout: post

categories:
  - dajsiepoznac2017
date: 2017-03-09 21:10:16
tags:
---

### Wstęp

W tej serii chciałbym napisać parę zdań na temat tego jak doszedłem do punktu, w którym postanowiłem wziąć udział w konkursie Daj Się Poznać, na temat nauki programowania, szukania pracy jako programista i ogółem - przygody z kodowaniem.

### Początki

Z informatyką i komputerami styczność miałem od dziecka, ale pierwsza myśl o zostaniu programistą powstała w mojej głowie w wieku 16-17 lat kiedy na zajęciach z C++w technikum informatycznym napisałem prosty, konsolowy program odgrywający fragment Toccaty i Fugi Jana Sebastiana Bacha. Niestety był to chwilowy zachwyt nad stworzeniem czegoś własnego i mimo, że próbowałem w domu uczyć się C++ na własną rękę, to tak naprawdę nie wiedziałem po co mi to będzie kiedyś przydatne i jakie szanse na karierę rodzi nauka programowania. Poza tym zakorzeniony gdzieś w świadomości mit programisty, który nie ma życia oprócz swojej piwnicy i jedyne co robi to programuje przez 20 godzin zrobił swoje. Dodatkowo kompletnie odstraszała mnie składnia C++, której nie lubię po dziś dzień, jak również te nieszczęsne wskaźniki. Próbowałem również z PHP ale w owym czasie trafiałem na bardzo złe źródła wiedzy, w których język ten wyglądał dla mnie jeszcze gorzej niż C++. Nie byłem zbyt świadom istnienia innych, przyjemniejszych dla początkującego języków programowania tak więc słomiany zapał szybko się skończył.

Wróćmy jednak do tego jakim cudem udało mi się odegrać dzieło wielkiego kompozytora na głośniczku systemowym w sali lekcyjnej?

Było to mniej więcej tak:
- Zaczęliśmy od rysowania algorytmów na kartce i kodowaniu ich w Pascalu. Po pierwszym semestrem zabraliśmy się za C++, oczywiście bez obiektowości.
- Na którychś zajęciach nauczyciel pokazał nam jak wywołać metodę odpowiedzialną za głośnik systemowy.
- Postanowiłem, że nie będę wykonywał jego poleceń słowo w słowo, a zrobię coś “swojego” co będzie miało więcej sensu niż losowe tony.
- Przez swoją pasję do muzyki i doświadczenie w tworzeniu prostych utworów znałem teorie muzyki w stopniu wystarczającym na orientowanie się w dźwiękach na klawiaturze: czym jest nuta, czym jest częstotliwość dźwięku, jak częstotliwości mają się do siebie i czym jest herc.
- Stwierdziłem, że potrzebuje zbioru dźwięków potrzebnych do zagrania tego fragmentu utworu. Przyjąłem, że cztery oktawy (48 dźwięków) są wystarczające, czyli potrzebowałem 48-elementowej tablicy jakiegoś typu danych.
- Parametrem funkcji odpowiedzialnej za wydawanie dźwięku była liczba całkowita reprezentująca częstotliwość w hercach, więc musiałem stworzyć tablicę intów.
- Nie chciałem jednak ręcznie wpisywać herców do każdego pojedynczego dźwięku, stąd szukałem sposobu aby wypełnić tablicę częstotliwościami każdego dźwięku z tych 48 ośmiu. Nie mogły to być losowe liczby.
- Krótka wizyta na Wikipedii w poszukiwaniu zależności między dźwiękami zaowocowała wzorem matematycznym, określającym stosunek częstotliwości następnego dźwięku na klawiaturze pianina do poprzedniego, zaczynając od bazowego A = 440 hz.
- Po dłuższej walce ze składnią C++ miałem gotową pętle, która wypełniała każde z 48 elementów tablicy gotową do odegrania nutą.
- Sekwencje dźwięków niestety wprowadziłem już “z palca” pisząc tony[30], tony[28 itd… (tak, zmienne pisaliśmy w języku polskim) przypominając sobie jak grałem ten utwór na keyboardzie.

Oczywiście wszytko to brzmi bardzo prosto z perspektywy osoby, która coś już teraz wie, jednak wówczas nie wyglądało to tak kolorowo.

### Co pokazuje ta krótka anegdota?

Miałem szczęście, że już w tamtych, odległych czasach miałem do czynienia z zalążkami algorytmicznego myślenia, bo był to pierwszy problem programistyczny jaki sam o własnych siłach rozwiązałem. Treść problemu brzmiała:

“Jak odegrać Toccate i Fuge Jana Sebastiana Bacha na głośniczku systemowym w C++?”

Następnie rozbiłem problem na części składowe, a raczej zadałem sobie czego potrzebuje aby to wykonać?
- Coś co wyzwala dźwięk w głośniku.
- Jak przechować nuty w programie.
- Jaka jest zależność między nutami
- Jak je najprościej wprowadzić.
- Jak je odegrać.

Takie podejście umożliwiło mi uporanie się z niewykonalnym dla mnie wówczas zadaniem, które jednak okazało się bardzo proste, jeżeli spojrzymy na nie nie jak na jeden wielki problem, ale pięć małych oraz postaramy się przenieść nasz tok myślenia na tok myślenia maszyny wykonującej polecenie krok po kroku, tworząc algorytm w pseudojęzyku. W moim mniemaniu jest to jedna z najważniejszych o ile nie najważniejsza umiejętność początkującego programisty. Jeżeli masz duży problem, z którym nie wiesz jak sobie poradzić, zapewniam, że po rozpisaniu (a nawet rozrysowaniu) na kartce krok po kroku każdej rzeczy, która jest potrzebna aby go rozwiązać, sprawa staje się znacznie łatwiejsza.

Nauczyło mnie to też tego, że własny projekt to coś co rozwija i motywuje najbardziej i daje największą satysfakcję. Podczas nauki programowania robienie “cudzych”, wymyślonych przez kogoś zadań prosto z grubej książki, w których mamy obliczyć n-tą potęgę liczby X pomnożonej przez Y do sześcianu, czy miliardową już wersję programu zwracającego liczby pierwsze może tylko odrzucić od nauki. Jeżeli wymyślisz sobie najprostszy problem, najgłupszą aplikacje czy najmniejszą funkcję i SAM ją wykonasz - frajda będzie większa niż jeżeli miałbyś stworzyć program wykonujący coś totalnie dla ciebie bezsensownego prosto z podręcznika. Wielu moich znajomych na studiach zniechęciło się do programowania, ponieważ ujęcie akademickie jest moim zdaniem totalnie oderwane od realiów współczesnego rynku i świata: zamiast promować ciekawe, ambitne i przyjemne dla rozpoczynających naukę projekty, skupia się na pętlowych łamigłówkach i krzyżówkach wskaźników. Ale o tym w innym wpisie.

Dodatkowo - historyjka pokazuje, że wiedza z innych dziedzin czy pasji jest nieoceniona podczas nauki kodowania. W moim przypadku była to wiedza muzyczna zdobyta w okresie kiedy produkowałem muzykę elektroniczną i z niuansami technicznymi z zakresu dźwięku spotykałem się codziennie. Nigdy nie wiesz co może Ci się przydać w trakcie nauki i co da ci inspirację aby stworzyć coś własnego, a to przecież najprzyjemniejszy sposób na naukę programowania.

Gdybym cofnął się jeszcze wcześniej pewnie opisałbym pierwszą styczność ze schematem blokowym rysowanym na kartce. Wtedy wydawało mi się to idiotyczne - dzisiaj doceniam ćwiczenie wyrażania swoich myśli, konstruowaniu, rozbijaniu problemów na małe kroki i wizualną prezentację działania jakiegoś programu.

Niestety pech chciał, że przez kilka lat nie ruszałem w ogóle tego tematu z róznych przyczyn. Możliwe, że również zniechęciłem się do programowania, ponieważ nikt nie pokazał mi, że to może być po prostu “fajne”, a nie nudne. Przełom nastąpił wraz z odkryciem czegoś takiego jak Java a później front end development. Postanowiłem sobie, że jest to coś co chcę robić w życiu i będę do tego dążył.

O tym w następnej części do której oczywiście zapraszam.