---
title: Anatomia rozszerzenia Chrome
id: 180
layout: post

categories:
  - dajsiepoznac2017
date: 2017-03-16 22:49:04
tags:
---

W cyklu poświęconym konkursowej aplikacji czas na trochę, ale tylko trochę więcej technicznych spraw jakie należy mieć na uwadze podczas tworzenia własnego, autorskiego rozszerzenia.

### Czym jest Chrome Extension?

Wtyczka do przeglądarki Chrome to nic innego, jak zbiór czterech elementów: HTML, CSS, JavaScript i manifest. Pierwsze dwa to nic innego jak widok renderowany w oknie browsera. Jeśli jest to wtyczka podmieniająca np. speed dial (tak jak jest to w moim przypadku), to w HTML i podlinkowanym CSSie znajduje się wygląd strony startowej.

Oczywistym plusem w tym przypadku jest to, że nie muszę martwić się o kompatybilność z innymi przeglądarkami, bowiem siłą rzeczy jestem ograniczony tylko do jednej i na dodatek jej najnowszej wersji, zatem wszystkie nowości ze świata CSS i JS, które zostały zaimplementowane w Chromie (a z dużym prawdopodobieństwem tak jest) są do mojej dyspozycji.

Co do JSa, jak już wcześniej wspomniałem priorytetem jest szybkość działania, ale jeśli okaże się, że czas ładowania skryptu jest tak niski, iż pozwala na użycie jakiegoś frameworka z pewnością skorzystam z VueJS.

Czym jest manifest? Jak sama nazwa wskazuje, bądź jak domyślają się np. programiści Androida, jest to plik w formacie JSON określający ważne parametry naszego rozszerzenia, takie jak na przykład zezwolenia na korzystanie z konkretnego API przeglądarki.

### Manifest rozszerzenia Chrome

Tak wygląda przykładowy manifest:
<pre class="EnlighterJSRAW" data-enlighter-language="json">{
  "manifest_version": 2,

  "name": "Getting started example",
  "description": "This extension shows a Google Image search result for the current page",
  "version": "1.0",

  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab"

  ]
}</pre>
Pierwsza linijka to wersja manifestu. Następnie:

1.  nazwa rozszerzenia
2.  opis
3.  wersja wtyczki
4.  browser action zawierający dwa elementy

    *   adres ikony jaka wyświetli się po prawej stronie na pasku adresu
    *   adres pliku html z którego będzie korzystał popup pojawiający się po kliknięciu w ikonę.

5.  permission to zezwolenia wymagane do działania wtyczki

    *   activeTab to dostęp do obecnie otwartej karty w przeglądarce. Bez tego wpisu, wtyczka będzie wołała o dostęp do wszystkich danych wszystkich odwiedzanych witryn i wszystkich otwartych kart, co naraża nas na niebezpieczeństwo. Z activeTab wtyczka ma dostęp do URL strony, favicona i może korzystać obiektu tabs.Tab zwracanego z API chromeExtension.
Jest to najprostszy plik manifest.json, ale liczba rzeczy, które mogą się tam znaleźć jest duża. [Więcej tu.](https://developer.chrome.com/extensions/manifest)

Podobnie duża jest liczba funkcji udostępnianych developerom przez twórców chrome. Możemy stworzyć na przykład

1.  Rozszerzenie, które wysyła powiadomienia na pulpit przez Notification API
2.  Theme, czyli zmienić wygląd przeglądarki
3.  Content Script - skrypty JS uruchamiane na otwieranych stronach.
4.  Korzystając z Bookmarks API  - wtyczkę do zarządzania zakładkami
To tylko niektóre z nich. Mnie interesuje coś, co nazywa się Override Pages, czyli wszystko to, co podmienia domyślne obszary w przeglądarce takie jak

1.  Widok nowej karty
2.  Wygląd historii
3.  Menedżer zakładek
Aby zacząć od stworzenia czegoś takiego w naszym pliku manifest.json należy zamieścić linijkę mówiącą co chcemy dokładnie zastąpić (newtab, history lub bookmarks)
<pre class="EnlighterJSRAW" data-enlighter-language="json">{
  "name": "Simple Speed Dial",
  ...

  "chrome_url_overrides" : {
    "newtab": "simpleSpeedDial.html"
  },
  ...
}</pre>
Chrome rzuca też kilka bardziej lub mniej oczywistych tipów dotyczących tworzenia rozszerzenia typu Override Page.

1.  Stwórz stronę szybką i o małym rozmiarze. Tłumaczyć tego nie muszę
2.  Dodaj tytuł do znacznika <title>. W przeciwnym razie pokaże się po prostu nazwa pliku, co może być nieco mylące.
3.  Pasek adresu zawsze dostaje focus po otwarciu nowej karty, więc nie warto opierać funkcji swojego rozszerzenia na 'autofocusie'. Niestety w kilku rozszerzeniach tego typu jakie testowałem następował swojego rodzaju focus-hijacking i zamiast standardowego zachowania focus znajdował się w super ulepszonym omniboksie, który fetchował dane autosugestii chyba z jakiegoś pakistańskiego serwera mirrorującego data-center Google, postawionego na Commodore 64, bo wszystko działało z prędkością żółwia.
4.  **Nie emuluj standardowej strony nowej karty**. Przyznam, że trochę zbiło mnie to z tropu, ponieważ nie planowałem totalnej rewolucji w postrzeganiu speed diala. Dokumentacja mówi, że API służące np. do odczytywania najczęściej odwiedzanych lub niedawno zamkniętych stron jeszcze nie istnieje i sugeruje stworzenie czegoś kompletnie innego. Nie wiem, czy nie przeczytałem tego za późno, ale mam nadzieję, że sprawa nie ma się aż tak tragicznie i nie będę musiał wynajdować koła na nowo aby moja wtyczka przeszła przez weryfikacje i - co najważniejsze - działała poprawnie.
Tyle na dziś. Kod na [GitHubie ](http://github.com/svantetic)dopiero jutro - nie mam na to siły dziś po walce z Mocha, Chai i pustym VPSem czekającym na konfiguracje.

Zapraszam do śledzenia!