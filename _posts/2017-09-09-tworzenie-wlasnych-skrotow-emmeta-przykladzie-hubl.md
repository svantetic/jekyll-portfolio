---
title: Tworzenie własnych skrótów do Emmeta na przykładzie HubL
id: 296
categories:
  - porady
date: 2017-09-09 15:55:53
tags:
---

Ostatnio podczas żmudnej pracy nad pewnym firmowym blogiem na platformie [HubSpot](https://www.hubspot.com/), która oferuje dostęp do kodu na froncie tylko przez swój edytor tekstu pozbawiony autouzupełniana i jakichkolwiek innych przydatnych pomocy w pisaniu odpaliłem starego dobrego Sublime Text 3 aby napisać bloki szablonu pięć razy szybciej.

### W jaki sposób działa front end na koncie HubSpot

Po wykupieniu konta na platformie otrzymujemy miejsce na szablony pojedynczych stron / bloga / mailingów, które możemy edytować z wizualnego panelu. Aby umożliwić klientowi czy pracownikowi firmy dodanie contentu szablonu, należy umieścić w nim tagi [HubL](http://designers.hubspot.com/docs/hubl/intro-to-hubl), czyli języka opartego na Twigu, lub bardziej precyzyjnie na template engine [Jinja](http://jinja.pocoo.org/). W ten sposób w przewidzianym przez designera / developera miejscu użytkownik może dodać swój własny tekst, zdjęcie, link czy przyciski.

Przykładowy kod nagłówka wraz z tagiem HubL wygląda tak
{% raw%}
&lt;h1&gt;
{% text "header_text_1" label="Enter header text", value="Default header" no_wrapper=True %}
&lt;/h1&gt;
{% endraw %}
Tag składa się z kilku części

1.  otwierające nawiasy z procentem
2.  nazwa pola przetwarzana przez backend HubSpota. Na jednej stronie nie może być dwóch pól o takiej samej nazwie
3.  label opisujący co powinno tam się znajdować
4.  domyślna wartość
5.  parametr określający, czy kod zwróci czysty tekst czy zamknięty w tagi &lt;span&gt;&lt;/span&gt;
6.  zamykające nawiasy z procentem
Cała reszta to zwykły HTML, jednak aby strona nie była statyczna i nie mijała się z ideą szablonów HubSpot z reguły dąży się do jak największej ilości edytowalnych elementów. W ten sposób każde zdjęcie, tekst, przycisk czy moduł (niezależne od siebie bloki kodu, które można wstawić w dowolne miejsce strony) powinno być wstawione za pomocą tagu w odpowiednie pole. Jeżeli takich miejsc mamy kilkanaście, pisanie (lub kopiowanie z dokumentacji, co zdarzało mi się znacznie częściej niż pisanie z pamięci) za każdym razem dosyć długiej formułki jest bardzo uciążliwe.

Jako, że jestem zwolennikiem jak największej optymalizacji i automatyzacji powtarzalnych czynności postanowiłem stworzyć swoje własne reguły do Emmeta, które znacznie przyspieszą proces pisania stron z tagami HubL.

### Konfiguracja Emmeta

Edytorem w tym przypadku jest SublimeText, ale podejrzewam, że w każdym korzystającym z Emmeta można ustawić swoje własne reguły.

Po wejściu w plik konfiguracyjny JSON Emmeta przez Preferences -&gt; Package Settings -&gt; Emmet -&gt; Settings User dostajemy podstawowy plik konfiguracyjny:

[![](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-1.png)](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-1.png)

Pod snippets znajdują się nazwy języków, po których Emmet rozpoznaje jakie skróty są dostępne. Dopisujemy HTML a pod nim snippets. Analogicznie postępujemy w przypadku innych języków.

[![](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-2.png)](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-2.png)

Należy pamiętać o przecinku po zamykającym obiekt "javascript" nawiasie. W moim przypadku dodałem trzy snippety:

*   jednolinijkowy text
*   rich_text wyświetlający w jego miejsce edytor WYSIWYG
*   image_src czyli moduł wyświetlający obrazek do wyboru, z którego zwracane jest tylko samo źródło
Po dodaniu wygląda to następująco

[![](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-3.png)](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-3.png)

Oraz w kodzie:
{% raw %}{
  "snippets": {
    "javascript": {
      "abbreviations": {
        "log": "console.log()"
      }
    },
    "html": {
      "snippets" : {
        "hubltext" : "{% text \"$1\" label=\"$2\", value=\"$3\" no_wrapper=True %}",
        "hublrich" : "{% rich_text \"$1\" label=\"$2\" html=\"$3\" %}",
        "hublimg"  : "{% image_src \"$1\" src='$2', no_wrapper=True %}"
      }
    }
  }
}{% endraw %}
Miejsca, w które ma przeskakiwać kursor po wciśnięciu TAB oznaczone są za pomocą dolara z numerem. Ukośniki to character escaping, ponieważ w kodzie tagów znajduje się cudzysłów.

Po zapisaniu konfiguracji można już skorzystać ze zdefiniowanych skrótów. W moim przypadku po napisaniu hubltext generowany jest praktycznie gotowy kod tagu:

[![](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-4.png)](http://arkadiuszm.pl/wp-content/uploads/2017/09/emmet-tut-4.png)

Polecam eksperymentowanie i dodawanie często powtarzalnych bloków kodu aby nie marnować czasu na zbędne rzeczy.