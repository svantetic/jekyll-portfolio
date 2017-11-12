---
title: 'Wtyczka konkursowa: komponenty do zapisu i edycji zakładek.'
tags:
  - Vue
id: 264
layout: post
categories:
  - dajsiepoznac2017
date: 2017-05-04 17:32:12
---

Ostatnio zaimplementowałem funkcje tworzenia nowego folderu z zakładkami przy instalacji i zapisywania utworzonych zakładek do folderu wtyczki. Od tamtej pory poza funkcjonalnością wtyczki skupiłem się również na usprawnieniu procesu developmentu i buildu.

Udało mi się prostym trikiem [ZOBACZ JAK] zejść z około 24 sekund (po dodaniu jedynie 3 komponentów!) buildu webpacka do 4 a także usprawnić ładowanie skompilowanego kodu do przeglądarki.
{% highlight javascript %}if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]){% endhighlight %}
Zakomentowana część to webpackowy plugin w webpack.config.json, który pożerał 20 sekund cennego czasu przy kompilowaniu komponentów do pliku build.js. Nie wiem jakie mechanizmy tam działają, ale po nazwie można domyślić się, że chodzi tutaj o minifikacje i podmiane wszystkich nazw zmiennych i funkcji do losowych znaków. Mając do przetworzenia wynikowy plik składający się z ponad 6000 linijek prawdopodobnie to było największym bottleneckiem w wydajności webpacka.

Na dodatek przy którejś z rzędu kompilacji laptop odmówił posłuszeństwa a na jego ekranie pokazał się BSOD z kodem błędu "unknown store mode". Jakby tego było mało po restarcie ukazał się monit z BIOSu informujący o braku bootowalnych dysków w komputerze. Już powoli żegnałem się z moim poczciwym Lenovo, ale po kolejnym restarcie wszystko wróciło do normy. Prawdopodobnie dysk był pod zbyt dużym obciążeniem i ześwirował, bo w międzyczasie oglądałem odcinek Astrofazy i pobierałem FIFA 17 z Origin Access. W sieci brak informacji o webpacku powodującym bluescreena, tak więc szansa na to, że to JavaScript był powodem awarii komputera jest dosyć znikoma.

Co do szybkości testowania skompilowanego kodu, znalazłem przyjemną wtyczkę o nazwie Reload Extensions, która pozwala na przeładowanie niespakowanych rozszerzeń do Chrome jednym kliknięciem, a nie czterema, tak więc pisanie i testowanie działania wtyczki stało się nieco bardziej przyjemne. A mówili: ucz się TDD.

Na początek krótki GIF z tego, na jakim etapie rozwoju jest Simple Speed Dial:

[caption id="attachment_265" align="alignnone" width="652"][![screencast](http://arkadiuszm.pl/wp-content/uploads/2017/04/screencast.gif)](http://arkadiuszm.pl/wp-content/uploads/2017/04/screencast.gif) Jak widać na załączonym gifie - wygląd pozostawiam na sam koniec.[/caption]

Oczywiście wszystko jest ładnie zapisywane i usuwane z folderu w menedżerze zakładek.

Na dzień dzisiejszy działa:

1.  Automatyczne tworzenie / sprawdzanie folderu z zakładkami
2.  Dodawanie nowych zakładek
3.  Dostosowanie URLa do Chromowych wymagań (prefix http na początku)
4.  Usuwanie zakładek z folderu/listy na froncie.
W jaki sposób zostało to zrealizowane?

Tak mniej więcej wygląda struktura plików:

[![pliki](http://arkadiuszm.pl/wp-content/uploads/2017/04/pliki.png)](http://arkadiuszm.pl/wp-content/uploads/2017/04/pliki.png)

Cztery obecne komponenty to:

1.  App.vue, zajmujący się wyświetlaniem listy na głównej stronie wtyczki i komunikacja z pozostałymi komponentami.
2.  EditBookmarkModal.vue, który jest niczym innym jak oknem edycji zaprezentowanym wyżej na gifie, która jeszcze nie działa jak należy.
3.  NewBookmarkModal.vue odpowiedzialny za dodawanie nowej zakładki, poprawienie URLa w razie jego złego wpisania i zapisanie bookmarka do pamięci Chrome.
4.  Store, czyli obiekt emulujący state management.
Po kolei.
{% highlight html%}  <div class="extension__wrapper">
            <new-bookmark-modal></new-bookmark-modal>
            <edit-bookmark-modal></edit-bookmark-modal>
            <ul class="extension__bookmarks">
                <li v-for="editedBookmark in extensionBookmarks" class="extension__bookmark">
                    <p> {{ editedBookmark.title }} </p>
                    <a :href="editedBookmark.url"> {{ editedBookmark.url }}</a>
                    <button @click="openEditModal(editedBookmark)"> Edit </button>
                    <button @click="deleteBookmark(editedBookmark)"> DELETE </button>
                </li>
            </ul>
            <button class="button button--primary" @click="openNewBookmarkModal"> Add new bookmark</button>
        </div>{% endhighlight %}
**Struktura i nazewnictwo klas i elementów jest na razie tymczasowe i zostanie zmienione na coś z większym sensem.**

Zaraz w środku wrappera znajdują się wspomniane wyżej komponenty. Tutaj ukazuje się siła i wygoda Vue, gdzie podobnie jak w Angularze możemy utworzyć swój własny markup HTML reprezentujący komponenty aplikacji.

Zastanawiam się nad wydzielenie kolejnego komponentu składającego się z pojedynczych zakładek.

Następnym elementem jest prosta lista renderująca dane modelu pobierane na początku z API Chrome Extension:

1.  Nazwa zakładki
2.  Link ze zbindowanym atrybutem :href. Można to zapisać również jako v-bind:href, ale przyzwyczaiłem się do skrótowego zapisu choć często zdarza mi się być niekonsekwentnym.
3.  Dwa buttony

    1.  Edit - Otwieranie komponentu EditBookmarkModal
    2.  Delete - usuwanie zakładki.

4.  Otwieranie okna dodawania nowej zakładki.
Zastosowałem state management w postaci instancji Vue podpiętej do obiektu window:
{% highlight javascript %}import Vue from 'vue';
export default window.Store = new Vue();{% endhighlight %}
Rozwiązanie póki co spełnia swoje założenia, więc podpięcie Vuex jest na dzień dzisiejszy zbędnym obciążeniem dla wtyczki.

&nbsp;
{% highlight javascript %}openEditModal(bookmark) {
            Store.$emit('openEditModal', bookmark);
        },{% endhighlight %}
Po co tutaj state management?

Jeżeli w głównym komponencie Vue wciskam przycisk Edit, w tym momencie do globalnego Store przesyłany jest event "openEditModal" z danymi obecnie edytowanej zakładki po to, aby komponent EditBookmarkModal mógł przechwycić i wyświetlić obecnej zakładki w inputach. Można zastosować również mechanizm propsów i przekazać tą zakładkę jako atrybut, ale według mnie znacznie wygodniejszą i czytelniejszą metodą jest użycie jakiegoś state managementu.

Chromie nie zapisuje poprawnie adresów zakładek bez przedrostka http:// lub https://, o czym przekonałem się dopiero w trakcie testowania wtyczki.
{% highlight javascript %}getValidUrl(url) {
              if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
                  url = 'http://' + url;
              }  return url;{% endhighlight %}
Ta prosta metoda dokleja standardowy przedrostek. Muszę dopisać jeszcze pełnoprawną walidację wpisywanych danych, aby nic się nie popsuło.

Następnym etapem będzie dopracowanie komponentu edytującego zakładki a także strona wizualna, bo póki co nie wygląda to wcale/

Kod wtyczki można znaleźć na

[http://github.com/svantetic/simple-speed-dial](http://github.com/svantetic/simple-speed-dial)

&nbsp;