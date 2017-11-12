---
title: 'Problem: Content Security Policy vs Vue.js'
id: 215
layout: post
categories:
  - dajsiepoznac2017
date: 2017-04-04 23:37:17
---

Już wcześniej pisałem, że Vue.js wydaje się dla mnie idealną opcją jeżeli chodzi o JavaScriptowy lekki framework, dlatego też postanowiłem go użyć w moim konkursowym projekcie. Oczywiście development nigdy nie może być prosty i bezproblemowy a pierwszy większy problem pojawił się po podlinkowaniu Vue i skryptu wtyczki w indeksie. Po kolei.

Chciałem użyć najprostszego, stand-alone builda Vue ściągniętego prosto z githuba, aby nie obciążać przeglądarki 6000 linijkami webpacka po kompilacji [jednoplikowych komponentów](http://arkadiuszm.pl/2017/03/sfc-w-vuejs-na-przykladzie-listy-zadan/).

Niestety okazało się, że Chrome ma swoje Content Policy dotyczące wtyczek, a dokładniej skryptów JS. Wszystkie funkcje pokroju
{% highlight javascript %}alert(eval("foo.bar.baz"));
window.setTimeout("alert('hi')", 10);
window.setInterval("alert('hi')", 10);
new Function("return foo.bar.baz");{% endhighlight %}
zostają automatycznie blokowane. Niestety Vue korzysta prawdopodobnie z konstruktora new Function() podczas kompilacji i renderingu tagów w widoku HTML.

Jakie jest wyjście z tej sytuacji? Zastosowanie vue-loadera, rozbicie skryptu do single file components i build za pomocą webpacka.
{% highlight shell %}$ npm install -g vue-cli
$ vue init webpack-simple my-project
$ cd my-project
$ npm install
$ npm run dev{% endhighlight %}
Mam nadzieję, że webpack nie wpłynie znacząco na wydajność rozszerzenia, ale jeśli tak się stanie, to będę zmuszony wymyślić jakiś inny sposób.

&nbsp;

Po wpisaniu

$ vue init webpack-simple simple-speed-dial

Dostaje gotowy config webpacka i npm scripts.

Rozszerzenie składa się z jednego komponentu App.vue. Aby przetestować działanie API służącego do wczytywania zakładek z przeglądarki korzystając z metody chrome.bookmarks.getRecent() muszę dodać "bookmarks" do manifest.json.
{% highlight json %}{
  "manifest_version": 2,
  "name": "Simple speed dial",
  "description": "Simple Chrome extension changing default speed dial into something more awesome.",
  "version": "1",
  "permissions": [
    "activeTab",
    "bookmarks"
  ],
  "chrome_url_overrides": {
    "newtab": "./simple-speed-dial.html"
  }
}{% endhighlight %}
Można teraz przystąpić do testowania API dla wtyczek.

Moim zamiarem jest wyświetlenie 5 ostatnich zakładek dodanych przeze mnie do przeglądarki, zaraz po otworzeniu nowej karty w tle.

W pliku App.vue tworzę zatem puste pole danych w funkcji data:
{% highlight javascript %}export default {
       data: function () {
           return {
               test: 'this is test component',
               bookmarks: '',
           }
       },{% endhighlight %}
Pod bookmarks oczywiście znajdować się będą wczytane zakładki. Jak to zrobić? Za pomocą metody created(), która może znaleźć się w dowolnym komponencie aplikacji.
{% highlight javascript %}created: function () {
           chrome.bookmarks.getRecent(5, function(recentBookmarks) {
               this.bookmarks = recentBookmarks;
               console.log(this.bookmarks);
           }.bind(this));
       }{% endhighlight %}
Co tu robi instrukcja .bind(this)? W środku callbacka odwołujemy się do danych komponentu właśnie przez this, jednak kontekst wywołania tego słowa kluczowego jest inny, a więc pod thisem nie znajduje się nasz komponent a zawartość bookmarks.getRecent.

![](http://arkadiuszm.pl/wp-content/uploads/2017/04/this.png)

Dopiero po zastosowaniu .bind (lub też hacku w postaci var self = this) nasze dane będą widoczne dla warstwy widoku.

HTML wygląda tak:
{% highlight html %}<template>
    <div class="grid">
        <ul class="bookmarks__list">
            <li v-for="bookmark in bookmarks" class="bookmarks__element">
                <h5>{{ bookmark.title }}</h5>
                <a v-bind:href="bookmark.url">{{ bookmark.url }}</a>
            </li>
        </ul>
    </div>
</template>{% endhighlight %}
Jest tu banalnie proste jednostronne bindowanie danych z tablicy zakładek, wypisywanie szczegółow oraz bindowanie atrybutu URL dla linku.

Po zainstalowaniu wszystko wyświetla się tak:

![](http://arkadiuszm.pl/wp-content/uploads/2017/04/front-preview-294x300.png)

Dużo pracy jeszcze przede mną, ale najważniejsze już zostało chyba załatwione - konfiguracja środowiska i interakcja z API Chrome Extensions.

&nbsp;

Repozytorium

[https://github.com/svantetic/simple-speed-dial](https://github.com/svantetic/simple-speed-dial)