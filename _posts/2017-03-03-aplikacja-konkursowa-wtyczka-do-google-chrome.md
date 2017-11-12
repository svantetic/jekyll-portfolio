---
title: Aplikacja konkursowa - wtyczka do Google Chrome
id: 80
layout: post

categories:
  - dajsiepoznac2017
date: 2017-03-03 20:18:35
tags:
---

W [pierwszy, powitalnym](http://arkadiuszm.pl/2017/02/powitanie/) poście napisałem parę słów na temat projektu na konkurs Daj Się Poznać, którym jest wtyczka do przeglądarki Google Chrome. Rozszerzenie, którego nazwa na dzień dzisiejszy to Simple Speed Dial, będzie podmieniało domyślny widok po otwarciu nowej karty. Tak, wiem, takich rozszerzeń, które oferują sporo innych, przydatnych funkcji jest mnóstwo. Testowałem wiele z nich, jednak żadne nie przypadło mi do gustu w stu procentach, a jeżeli przeglądarka to prawdopodobnie najważniejsza aplikacja na komputerze każdego web developera musi być skonfigurowana idealnie pod moje potrzeby. Dlaczego Google Chrome?

### Bój z przeglądarkami

Przez wiele lat byłem fanem i użytkownikiem Opery, jednak coraz więcej zaczyna mi w niej przeszkadzać.

1.  Niejasna polityka twórców, którzy wypuścili alfa/beta wersje Opery Neon, niewiele później ogłaszając Opera Reborn, czyli projekt mający tchnąć nowe życie w przeglądarkę. Sugeruje to, że być może podstawowa, bazowa wersja odejdzie na dalszy plan.
2.  Sprzedaż firmy chińskiemu konsorcjum. Od tamtej pory czytam niepokojące wieści, jakoby personalne dane użytkowników były przesyłane za Wielki Mur w bliżej nieokreślonym celu.
3.  Bugi w silniku i słabe, nieoficjalne wsparcie dla rozszerzeń dla Chrome (po zainstalowaniu odpowiedniej wtyczki). Rozszerzenia w pełni pod Operę można policzyć na palcach jednej ręki.
4.  Niestabilne, powolne działanie.
Testowałem też przeglądarkę Vivaldi, która ogromnie kusi fantastycznymi możliwościami personalizacji. Jest to jednak produkt, któremu bardzo daleko do idealnego, choć stały rozwój daje szansę na to, że w niedalekiej przyszłości będzie to naprawdę godny konkurent Google Chrome, który staje się powoli monopolistą w tej gałęzi rynku IT. Co jest nie tak z Vivaldi? Pokrótce:

1.  Brak mobile view w dev toolsach, co z miejsca dyskwalifikuje Vivaldi jako przeglądarkę dla developerów.
2.  Brak mobilnej wersji
3.  Brak synchronizacji między komputerami/kontami.
Nie ma oficjalnej daty kiedy takie funkcje mogłyby się pojawić, tak więc na dzień dzisiejszy nie jestem w stanie korzystać z Vivaldi jako swojej głównej przeglądarki.

Firefoxa w tym zestawieniu pomijam, ponieważ kompletnie mi nie leży i posiada sporo dziwnych quirków w przetwarzaniu najnowszych funkcji chociażby CSS3.

Biorąc pod uwagę wszystko powyższe jedynym dobrym i pewnym wyborem pozostaje Chrome. Jedyna rzecz jaką zmieniłbym w przeglądarce Google to widok nowej karty.

1.  Wyświetlanie najczęściej odwiedzanych witryn jest rozwiązaniem, które kompletnie do mnie nie trafia - nie uważam, że algorytm wie lepiej niż ja w które miejsce sieci chcę teraz zajrzeć.
2.  Pokazywanie tylko 8 stron.
3.  Brak możliwości jakiejkolwiek selekcji ich i edycji ich wyświetlania.
4.  Brak folderów, w których można pogrupować strony.
5.  Brzydkie tło ;)
Chrome udostępnia możliwość edycji wyglądu speed diala przez rozszerzenie, więc postanowiłem napisać od zera własne w ramach konkursu Daj Się Poznać. Ostatecznym celem jest publikacja wtyczki w repozytorium rozszerzeń i śledzenie, czy zaproponowane przeze mnie rozwiązanie trafi do szerszego grona użytkowników.

### Główne założenia do projektu

Analizując kilka najpopularniejszych wtyczek personalizujących widok nowej karty stworzyłem zarys tego jak będzie wyglądał mój.

1.  Personalizacja kafelek - możliwość dodania nowej strony z zakładek lub po ręcznym wpisaniu adresu. Rozwiązanie prosto z Opery.
2.  Szybkość działania - wszystkie wtyczki z tej kategorii, które testowałem charakteryzowały się bardzo powolnym działaniem. Jeżeli mam czekać 3 sekundy zanim pojawi mi się karta wyboru strony to coś tutaj jest nie tak.
3.  Framework JS - prawdopodobnie będzie to Vue, który znam najlepiej. Jeśli jednak okaże się, że szybkość działania nie jest taka o jaką mi chodziło, będę musiał znaleźć inne rozwiązanie.
4.  Prosty, minimalistyczny design zaprojektowany od podstaw. Zastanawiam się nad zastosowaniem wytycznych Material Design, ale ten styl jakoś do mnie nie przemawia.
5.  Panel konfiguracji, w którym zawarte będą najważniejsze opcje. Jakie? To okaże się w niedalekiej przyszłości.
To jest plan MVP. Jeżeli uda mi się zaimplementować 4 powyższe funkcjonalności będę mógł zabrać się za dopieszczanie, czy dodawanie innych funkcji personalizacji.

Wszystko prezentuje się prosto i łatwo, ale prawdopodobnie jest to tylko cisza przed burzą. Ponieważ nigdy nie miałem styczności z developmentem jakiegokolwiek rozszerzenia dla przeglądarkę w trakcie pracy może okazać się, że z pozoru banalny na pierwszy rzut oka problem będzie wymagał dużej ilości główkowania.

Za tydzień postaram się opublikować pierwszy draft designu wtyczki. Kod projektu będzie znajdował się [pod tym adresem](https://github.com/svantetic/simple-quick-dial/).

Zachęcam do obserwowania repo na githubie. Tymczasem udaję się do dokumentacji Chrome.