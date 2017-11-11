---
title: Ekosystem Vue
tags:
  - Vue
id: 256
layout: post
categories:
  - dajsiepoznac2017
date: 2017-04-24 14:57:42
---

### Słowo wstępne

Chyba wszystkie frameworki do JavaScriptu posiadają swój tzw. ekosystem, czyli zbiór mniejszych bibliotek lub narzędzi, które wprowadzają jakaś funkcjonalność znaną na przykład z innych frameworków lub ułatwiają proces developmentu czy buildu. Nie inaczej jest z VueJS.
Bardzo często w tym całym dodatkowym i niby-opcjonalnym gąszczu paczek npma można się zgubić i zamiast zacząć pisać będziemy instalować kolejne pluginy lub biblioteki, a w trakcie tego entuzjazm dotyczący nowego, wymyślonego przez nas projektu zdąży opaść.
Skupie się na tych najbardziej sprawdzonych, w miarę "oficjalnych" i największych częściach ekosystemu, bez których stworzenie kompletnej web aplikacji jest albo utrudnione albo niemożliwe. Jeżeli nie tworzymy kolejnego Instagrama, to w zupełności wystarczy nam tylko najnowsza wersja Vue. Wszystkie pokazane tutaj części ekosystemu są opcjonalne. Nie będzie to tutorial uczący jak korzystać z danych bibliotek a bardziej przekrój przez te oferowane przez kontrybutorów frameworku.

### Vue CLI

W jaki sposób możemy zacząć używać Vue w naszych projektach? Mamy tutaj kilka opcji:

- Załadować do tagu &lt;script&gt; adres CDNa, który dostarcza nam pożądaną przez nas wersję. Zalety i wady takiego sposobu zna chyba każdy, natomiast już na tym etapie możemy to zrobić dwojako:
- Używając pełnego builda produkcyjnego, który loguje nam do konsoli wszystkie błędy, ostrzeżenia, informacje i porady. Ta wersja pozwala na debugowanie naszej aplikacji we wtyczce przeglądarkowej Vue Dev Tools, o której mowa trochę niżej. [https://vuejs.org/js/vue.js](https://vuejs.org/js/vue.js)
- Linkując zminifikowany plik .js o rozmiarach ~27kb gzipped, co jest rozmiarem porównywalnym do najnowszej wersji jQuery. Na produkcji nie chcemy raczej, aby użytkownik widział wszystkie informacje logowane do konsoli lub użyć Vue DevTools do debugowania jej wprowadzając jakieś niepożądane działania. https://vuejs.org/js/vue.min.js
- Użyć NPMa i po wpisaniu npm install vue zacząć używać frameworka.
- Skorzystać z Vue CLI [https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

O Vue CLI wspominałem już w innych postach. Jest to narzędzie działające w wierszu poleceń, które tak jak Yeoman służy do generowania struktury projektu. Wariantów również jest kilka, ale na sam początek polecam webpack-simple, czyli szkielet projektu ze skonfigurowanym webpackiem i vue-loaderem, co pozwala nam rozbić całą aplikację do single file components, a więc małych plików z roszerzeniem .vue, w których znajduje się:

- Template, czyli struktura HTML komponentu
- Logika komponentu między znacznikami &lt;script&gt;
- Styl napisany w dowolnym preprocesorze bądź czystym CSSie.

Możemy też użyć konfiguracji dla browserify o nazwie browserify-simple, lub pełnej wersji zarówno dla webpacka i browserify, która zawiera w sobie moduły:

- ESLint do sprawdzania czy nasz kod jest zgodny z konwencjami
- Hot-reload czyli podmiana kodu JS i modułów webpacka w przeglądarce bez potrzeby odświeżania okna.
- Testy jednostkowe w frameworku Karma
- Testy przeglądarkowe end-to-end w Nightwach i Selenium.

Jeżeli ktoś potrzebuje tych wszystkich funkcji spakowanych w jeden szablon i odpowiednie skrypty npma, może zainstalować je za pomocą
vue init webpack nazwa-projektu

#### Kiedy należy korzystać z VueCLI ?

VueCLI powinniśmy użyć jeżeli:

- chcemy korzystać z Single File Components
- wiemy jak skonfigurować webpacka/browserify do współpracy z Vue ale nie chce nam się tego robić za każdym razem
- chcemy full profesjonalnego rozwiązania z testami jednostkowymi i linterem.

Repozytorium i dodatkowe informacje znajdują się pod tym linkiem
[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

### Vuex

Vuex to narzędzie do state managementu, czyli zarządzenia stanem naszej aplikacji inspirowane architekturą Flux i jej implementacją we frameworku React czyli Redux.
Co to w ogóle jest zarządzanie stanem?
Wyobraźmy sobie taką sytuację, że w naszej aplikacji posiadamy kilka różnych komponentów, które przyjmują jakieś dane, modyfikują je i wysyłają jakieś zdarzenia. O ile dane i zdarzenia są powiązane na zasadzie parent &lt;-&gt; child, czyli w jakimś dużym komponencie są inne, małe moduły to używanie do tego Vuexa/Reduxa mija sięz celem, ponieważ framework sam w sobie posiada mechanizm eventów i atrybutów/propsów przekazywanych na dół bądź w górę drzewa komponentów.
Co jeżeli mamy kilkanaście komponentów, których stan/dane zależą od jakiegoś innego komponentu, który nie jest jego rodzicem bądź dzieckiem? Użycie state managementu jest jedynym sposobem na utrzymanie porządku w aplikacji, debugowanie jej w zależności od zdarzeń występujących w komponentach i śledzenie zmian w całej strukturze.
Tworzymy wtedy coś co nazywa się store, przechowujący wszelkie dane z których korzystają różne od siebie komponenty.
Taki store w Vuex posiada trzy najważniejsze moduły:

- State, czyli wspomniany stan
- Mutators, czyli metody przez które musimy się odwołać z innych komponentów aby zmienić stan naszej aplikacji.
- Getters - po prostu gettery znane z JS i innych języków programowania, które zwracają nam konkretny stan.

Wszystko jest tutaj reaktywne, czyli zatwierdzenie jakiejś mutacji jest w tym samym czasie propagowane na wszystkie komponenty, których stan lub dane zależą od stanu w naszym store.

Wydawać się to może bardzo skomplikowane, ale jeżeli dojdziemy do sytuacji wymagającej użycia state managementu, to wszystko staje się oczywiste i proste. Zwłaszcza jeżeli ktoś stosuje podejście JQDD, czyli jQuery Driven Development, gdzie cała aplikacja składa się z handlerów eventów .onClick - śledzenie zmian, czytanie takiego kodu, utrzymywanie go czy dodawanie nowych funkcji to jest prawdziwa katorga.

#### Kiedy użyć Vuex?

Vuex powinniśmy używać jeżeli:

- W naszej aplikacji istnieje częsta komunikacja między komponentami niepowiązanymi z sobą relacją rodzic &lt;-&gt; dziecko
- Jeżeli mnogość stanów zaczyna przeszkadzać nam w pracy

**Dokumentacja**

[https://vuex.vuejs.org/en/installation.html](https://vuex.vuejs.org/en/installation.html)

### **Vue Resource**

Niestety albo i stety w Vue zabrakło miejsca na obsługę web requestów. Jeśli nie mamy czasu na pisanie obsługi starszych przeglądarek albo na pisanie obsługi żądań w czystym JS, najbardziej kusi zaimportowanie biblioteki legitymującej się skrótem $, ale po co dodawać całą osobną bibliotekę aby korzystać tylko z jednej funkcji? Na pomoc przychodzi vue-resource, które dodamy do aplikacji przez

var VueResource = require('vue-resource');
Vue.use(VueResource);

Od twórców wtyczki dostajemy wsparcie dla Promises, interceptory, czyli metody modyfikujące request przed lub po jego wysłaniu a także wsparcie dla IE w wersji 9+ i ostatnich wersji innych najpopularniejszych przeglądarek.
Nie testowałem vue-resource pod Edge, ale myślę, że wszystko działa jak należy.

#### Kiedy użyć Vue-Resource?

- Kiedy potrzebujemy komunikacji z API, czyli prawdopodobnie w 99% przypadków.

### Vue Router

Routing to jedna ze składowych single page applications. Czym jest routing? Jest to nawigacja na "podstronach" naszej aplikacji, która niejako emuluje przechodzenie na kolejną podstronę danego serwisu. Nie pobieramy tutaj jednak z serwera całego wygenerowanego HTMLa, więc w przypadku routera dla Vue wyświetlamy jakieś komponenty lub dane po kliknięciu w konkretny, odpowiednio oznaczony link.

Więcej rzeczy możecie przeczytać w oficjalnej dokumentacji projektu
[http://router.vuejs.org/en/](https://vuex.vuejs.org/en/installation.html)

#### Kiedy używać vue-router?

- Jeżeli chcemy zaimplementować nawigacje dla naszej webaplikacji

### Vue DevTools

![vuedevtools](http://arkadiuszm.pl/wp-content/uploads/2017/04/vuedevtools-300x194.png)

Ostatnie opisywane narzędzie to chyba najbardziej przydatna biblioteka dla stawiających pierwsze kroki w tym frameworku. Jest to rozszerzenie do Chrome, które w przeglądarkowych DevToolsach dodaje nam panel z Vue, na którym mamy pogląd

- Modelu danych w komponentach - wszystko co znajduje się w obiekcie/funkcji data
- Eventów uruchamianych przez komponenty, co wysyła, gdzie, z jakim zestawem danych
- Podgląd stanu Vuex, gdzie możemy "przewijać" się w czasie i sprawdzać co się zmienia w naszej aplikacji.

Wszystko to stanowi nieocenioną pomoc przy pisaniu aplikacji w Vue, nie tylko dla początkujących.
**Rozszerzenie można pobrać z tego linku**
[https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

**Repozytorium projektu**
[https://github.com/vuejs/vue-devtools](https://github.com/vuejs/vue-devtools)

### Podsumowując

Jeżeli tworzysz małą aplikację, niewymagającą state managementu czy routingu polecam tylko Vue DevTools, vue-resource i ewentualnie Vue CLI aby nauczyć się webpacka lub browserify.

Jeśli jednak masz zamiar pisać coś większego to sprawdzi się konfiguracja ze wszystkimi opisanymi tutaj elementami ekosystemu: vuex, vue-router, vue-resource, vue-cli i vue-devtools.