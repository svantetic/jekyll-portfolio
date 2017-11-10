---
title: 'Wtyczka konkursowa: tworzenie folderu z zakładkami'
id: 232
categories:
  - dajsiepoznac2017
date: 2017-04-14 12:37:05
tags:
---

Jako, że cały build process i framework działa jak należy, a wtyczka wyświetla testową stronę (więcej tu [Problem: Content Security Policy vs Vue.js](http://arkadiuszm.pl/2017/04/problem-content-security-policy-vs-vue-js/) ), która po prostu czyta ostatnio dodane zakładki i przekazuje je do widoku nadszedł czas na dopracowanie tego tak, aby przy instalacji wtyczki:

1.  Sprawdzić czy istnieje już folder zakładek o nazwie "Simple Speed Dial"
2.  Jeżeli nie, to utworzyć go.
Wczoraj kilkadziesiąt minut spędziłem na szukaniu odpowiedniej metody w Chrome Extension API w dokumentacji Chrome, która nie należy do najbardziej przyjaznych i kolejne kilkadziesiąt na tym, aby wszystko działało jak należy.

### Od początku

Metoda, której szukałem to
<pre>chrome.runtime.onInstalled()

</pre>
Byłem przekonany, że wystarczy wrzucić ją przed wywołaniem i podpięciem głównej instancji Vue wtyczki, w ten oto sposób
<pre class="EnlighterJSRAW" data-enlighter-language="null">chrome.runtime.onInstalled.addListener((reason) =&gt; { ... });

import Vue from 'vue';
import App from './App.vue';

new Vue({
    el: '#container',
    render: r =&gt; r(App)
});</pre>
Niestety ten sposób nie działa, ponieważ zanim skrypt zostanie przetworzony event onInstalled dawno się odpali a listener nie uruchomi odpowiedniej funkcji.

Kilka stron na stackoverflow później dowiedziałem się, że we wtyczce może istnieć specjalny skrypt background.js, gdzie mogą się znajdować wszystkie funkcje/handlery odpowiedzialne za działanie wtyczki za kulisami. Aby to zrobić należy po stworzeniu takiego skryptu dopisać informację o nim w pliku manifestu.
<pre class="EnlighterJSRAW" data-enlighter-language="json">"permissions": [
    "activeTab",
    "bookmarks"
  ],
  "background" : {
    "scripts" : ["./js/background.js"]
  },
  "chrome_url_overrides": {
    "newtab": "./simple-speed-dial.html"
  }</pre>
Debugowanie takiego pliku nie jest możliwe za pomocą starego dobrego console.log. Użyłem za tem jeszcze starszego i jeszcze lepszego alerta, który pokazuje czy funkcja handlera została odpalona.
<pre class="EnlighterJSRAW" data-enlighter-language="js">chrome.runtime.onInstalled.addListener((reason) =&gt; {
    alert('installed!');
});
</pre>
Chciałem tutaj użyć Promises API, ponieważ będę miał do czynienia z dwoma funkcjami wykonującymi się asynchronicznie - runtime.onInstalled i chrome.bookmarks.search().

Niestety w przeszukiwaniu internetu wpadłem na 10 stron prezentujących przykładowe użycie obietnic, na których każdy sposób był inny od poprzedniego i następnego. Nie mogąc dojść do porozumienia z tą konstrukcją języka, postanowiłem tymczasowo oprzeć się na callbackach.
<pre class="EnlighterJSRAW" data-enlighter-language="null">chrome.runtime.onInstalled.addListener((reason) =&gt; {
    chrome.bookmarks.search('Simple Speed Dial', (bookmarks) =&gt; {
        if (bookmarks.length === 0)
            chrome.bookmarks.create({
                'title' : 'Bookmarks from Simple Speed Dial extension'
            });
        else alert('bookmarks folder already created!');
    })
});</pre>
&nbsp;

Po zainstalowaniu/reloadzie wtyczki pokazuje się alert jeżeli folder jest już obecny w folderze "Inne zakładki".Oczywiście w końcowym kodzie nie będzie żadnych alertów.

W samym komponencie Vue odpowiedzialnym za wtyczkę, tymczasowo znajduje się następujący kod
<pre class="EnlighterJSRAW" data-enlighter-language="null">export default {
        data: function () {
            return {
                extensionFolderTitle: 'Simple Speed Dial',
                extensionFolder: '',
                bookmarks: []
            }
        },
        methods: {
            fetchExtensionFolder() {
                let self = this;
                chrome.bookmarks.search(this.extensionFolderTitle, function(extensionFolder) {
                    self.extensionFolder = extensionFolder;
                })
            }
        },
        created: function () {
            this.fetchExtensionFolder();
        }
    }</pre>
Po stworzeniu instancji wywołuję metode fetchExtensionFolder, która szuka w zakładkach folderu wtyczki. Search zwraca tablice znalezionych elementów, jednakże skrypt background.js tworzy jeden folder, jeżeli ten nie został wcześniej utworzony.

### 99 problems

Widzę tu problemy, który należałoby rozwiązać już teraz.

1.  Użytkownik usunie folder wtyczki umyślnie lub przypadkowo.
2.  Użytkownik stworzy folder o nazwie zawierającej ciąg znaków szukany przez instancje "simple speed dial".
Dodatkowo, muszę znaleźć informację o tym, czy istnieje sposób na przechowanie gdzieś obiektu znalezionego folderu aby skrypt nie musiał tego robić za każdym razem kiedy otworzę nową karte.

Największą obecnie przeszkodą w pracy nad rozszerzeniem jest długi czas buildu i brak możliwości debugowania działania aplikacji bezpośrednio w Chromie. Po każdej zmianie kodu odpalanie skryptu npm build, który bundluje moduły za pomocą webpacka i transpiluje je za pomocą babela trwa od 6- 10 sekund.

![](http://arkadiuszm.pl/wp-content/uploads/2017/04/webpackbuild.png)

Spróbuje znaleźć lepszy sposób na testowanie działania wtyczki.

PS. Podziękowania dla autora blogu [http://webmastah.pl](http://webmastah.pl), który dorzucił do tygodniowego newslettera [mój post o Timberze](http://arkadiuszm.pl/2017/03/timber-czyli-twig-w-wordpressie/)

[Repozytorium wtyczki](http://github.com/svantetic/simple-speed-dial)