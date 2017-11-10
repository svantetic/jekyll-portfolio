---
title: 'Wtyczka konkursowa: odseparowanie komponentu zakładek'
tags:
  - Vue
id: 274
categories:
  - dajsiepoznac2017
date: 2017-05-13 16:12:33
---

Od ostatniego posta minęło trochę dni, a wszystko przez brak czasu - praca i uczelnia. Maj pod tym względem jest ciężkim miesiącem, nie inaczej jest w tym roku. Z tego powodu post będzie bardzo krótki. Mimo to wolnym tempem staram się dodawać kolejne funkcje do konkursowej wtyczki.

Zastanawiałem się ostatnio, czy aby komponent główny nie jest odpowiedzialny za zbyt wiele rzeczy - renderuje zakładki i wywołuje funkcje odpowiedzialne za zmianę stanu modali do edycji i dodawania nowej zakładki.

Odseparowałem więc komponent Bookmark do osobnego pliku, a właściwości każdej zakładki przekazuję za pomocą propsów.
<pre class="EnlighterJSRAW" data-enlighter-language="js">&lt;ul class="extension__bookmarks" v-on:ondrop="drop" v-on:dragover="dragOver"&gt;
              &lt;li v-for="bookmark in extensionBookmarks" class="extension__bookmark-list"&gt;
                  &lt;bookmark :url="bookmark.url" :title="bookmark.title" :id="bookmark.id"&gt;&lt;/bookmark&gt;
              &lt;/li&gt;

          &lt;/ul&gt;</pre>
Kod komponentu jest bardzo prosty:
<pre class="EnlighterJSRAW" data-enlighter-language="js">import Store from '../store/Store.vue';
  export default {
      name: 'bookmark',
      props: ['title', 'url', 'id'],
      methods: {
          openEditModal() {
              Store.$emit('openEditModal', this);
          },

          deleteBookmark() {
              Store.$emit('deleteBookmark', this);
          }
      }
  }</pre>
Dwie metody po prostu zmieniają stan zapisany w Store aby otworzyć odpowiednie modale.

Napisałem kilka reguł CSS aby wygląd nie był tak bardzo ohydny, ale nadal jest bardzo umowny. Nim zajmę się na sam koniec.

[![actual-screen](http://arkadiuszm.pl/wp-content/uploads/2017/05/actual-screen-1024x408.png)](http://arkadiuszm.pl/wp-content/uploads/2017/05/actual-screen.png)

Tak, wiem, brakuje marginów w odpowiednich miejscach.

Na dole widać zaczątki komponentu konfigurującego niektóre opcje. Na dzień dzisiejszy widzę tam ustawienie obrazka / koloru tła, aby z tyłu nie było pustej bieli.

Zacząłem pisać ten fragment kodu, ale wpadłem na problem: po zbindowaniu obrazka jako inline-style dla aplikacji, kontener z zakładkami nie pojawia się dopóki zdjęcie nie zostanie wczytane.

Wrócę za jakiś czas z bardziej kompletnym postem i opisem aplikacji konkursowej. Tymczasem odsyłam do repozytorium

[http://github.com/svantetic/simple-speed-dial](http://github.com/svantetic/simple-speed-dial)