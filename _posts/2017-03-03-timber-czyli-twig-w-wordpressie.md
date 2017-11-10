---
title: Timber czyli Twig w Wordpressie
id: 71
categories:
  - dajsiepoznac2017
date: 2017-03-03 22:59:12
tags:
---

Timber to rozszerzenie do Wordpressa, które mogę polecić wszem i wobec wszystkim developerom, którzy na codzień spotykają się z pisaniem szablonów pod WP, a także tym, którzy na samą myśl o pracy z WordPressowym kodem dostają skrętu żołądka. Wtyczka ta bowiem całkowicie zmienia proces kodowania i czyni go znacznie bardziej przyjemnym.

### Czym jest Timber?

Timber pozwala na użycie Twiga - tak, Twiga - podczas pisania nowej templaty.

Jakie są zalety takiego rozwiązania?

Nie mieszamy PHP z HTMLem, pliki layoutu zostają w swoich folderach, możemy je includować, rozszerzać... Kto miał styczność z Twigiem wie o czym mówię. A jeśli nie - Twig to template engine dla PHP używany między innymi w Symfony (tutaj [strona główna projektu](http://twig.sensiolabs.org/)).

Nie odbiło się to w żaden zauważalny sposób na wydajności całej strony dlatego też dziwi mnie, dlaczego wtyczka jest tak mało popularna. Pierwszą i ostatnią wzmiankę na jej temat przeczytałem w jakimś komentarzu na reddicie pod postem dotyczącym WP.

Jedynym minusem jaki zauważam to dokumentacja, która jest niejasno zorganizowana. Niektóre teksty znajdują się na githubie, inne na oficjalnej stronie rozszerzenia, kolejne zaś w sekcji Learning Guides. Strona główna odsyła też do  krótkiego videokursu na YouTube.

### Jak zacząć korzystać z Timbera?

Po pierwsze musimy zainstalować wtyczkę z repozytorium Wordpressa:
`https://pl.wordpress.org/plugins/timber-library/`
W tym momencie możemy już zacząć używać rozszerzeniaa

Na warsztat weźmy plik index.php, który w miom przypadku będzie odpowiadał za wyświetlenie listingu konkretnych customowych postów na stronie głównej.

Jak wygląda plik index.php (odpowiedzialny za stronę główną + blog listing) na przykładzie domyślnego szablonu Wordpress o nazwie TwentySeventeen?
{% raw %} 
&lt;div id="primary" class="content-area"&gt;

&lt;php if ( have_posts() ) :

/* Start the Loop */
while ( have_posts() ) : the_post();

/*
* Include the Post-Format-specific template for the content.
* If you want to override this in a child theme, then include a file
* called content-___.php (where ___ is the Post Format name) and that will be used instead.
*/
get_template_part( 'template-parts/post/content', get_post_format() );

endwhile;{% endraw %}
&nbsp;

Includowany plik z folderu template-parts zawiera standardowy widok posta.

{% raw %} 
  &lt;?php
    if ( is_sticky() &amp;&amp; is_home() ) :
      echo twentyseventeen_get_svg( array( 'icon' =&gt; 'thumb-tack' ) );
    endif;
  ?&gt;
  &lt;header class="entry-header"&gt;
    &lt;?php
      if ( 'post' === get_post_type() ) :
        echo '&lt;div class="entry-meta"&gt;';
          if ( is_single() ) :
            twentyseventeen_posted_on();
          else :
            echo twentyseventeen_time_link();
            twentyseventeen_edit_link();
          endif;
        echo '&lt;/div&gt;&lt;!-- .entry-meta --&gt;';
      endif;

      if ( is_single() ) {
        the_title( '&lt;h1 class="entry-title"&gt;', '&lt;/h1&gt;' );
      } else {
        the_title( '&lt;h2 class="entry-title"&gt;&lt;a href="' . esc_url( get_permalink() ) . '" rel="bookmark"&gt;', '&lt;/a&gt;&lt;/h2&gt;' );
      }
    ?&gt;
  &lt;/header&gt;&lt;!-- .entry-header --&gt;
{% endraw %}
To tylko część kodu - nie ma sensu wklejać całego pliku, ponieważ każdy może go znaleźć w katalogu

`wp-contents/themes/twenty-seventeen/template-parts/post/content.php`

Jak widać wygląda to niezbyt zachęcająco. Już sama kwestia mieszania PHP z HTMLem działa na niektórych anty-wordpressowców jak płachta na byka.

W tym momencie na pomoc przychodzi Timber, który sprawia, że pisanie pliku szablonu staje się znacznie bardziej przyjemniejsze. Przykład będzie opierał się na moim procesie tworzenia tego bloga.

Zaczynamy od podzielenia pliku index.php na dwa:

1.  Pierwszy z nich będzie odpowiadał tylko za logikę pobrania postów z bazy i w razie potrzeby odfiltrowania ich oraz przesłanie do pliku do widoku.
2.  Drugi, o nazwie na przykład layout-home.twig bądź twig-home.twig opowiadał będzie tylko za widok tychże postów.
Po zmianie index.php, pierwsze jego linijki powinny wyglądać mniej więcej tak:

{% raw %}

```
$context = Timber::get_context();
```

{% endraw %}
Czym jest $context?

Szybki var_dump i dostajemy takie coś

{% raw %} 
string 'http://arkadiusm.dev' (length=20)
'wp_title' =&gt; string '' (length=0)
'wp_head' =&gt;
object(Timber\FunctionWrapper)[309]
private '_class' =&gt; null
private '_function' =&gt; string 'wp_head' (length=7)
private '_args' =&gt;
array (size=0)
empty
private '_use_ob' =&gt; boolean false
'wp_footer' =&gt;
object(Timber\FunctionWrapper)[308]
private '_class' =&gt; null
private '_function' =&gt; string 'wp_footer' (length=9)
private '_args' =&gt;
array (size=0)
empty
private '_use_ob' =&gt; boolean false
'body_class' =&gt; string 'home page-template page-template-index page-template-index-php page page-id-6' (length=77)
{% endraw %}
&nbsp;

Jak widać pod obiektem kryją się wszystkie przydatne pola używane w pliku szablonu, do których możemy się odwołać, takie jak body_class.

W moim pliku strony głównej chciałem wyświetlić tylko custom posty o nazwie "projekt" zdefiniowane przeze mnie wcześniej w Wordpressie

Aby dodać do dyspozycji widokowi jakieś konkretne zmienne, obiekty lub tablice należy do obiektu $context pod nazwanym przez siebie kluczem przypisać wynik jakiejś metody.

W tym przypadku będzie to Timber::get_posts(), która odpowiada za zwracanie postów.

Jednocześnie przyjmie ona argumenty odpowiedzialne za wybranie tylko i wyłącznie postów o typie "project" i posortuje je w kolejności od najstarszego do najnowszego.
{% raw %}$post_args = array ( "post_type" =&amp;gt; "project", "order" =&amp;gt; "asc" );
$context["projects"] = Timber::get_posts( $post_args )

{% endraw %}

Aby przesłać działający zbiór postów i wyświetlić stronę potrzebujemy użyć jeszcze jednej funkcji

{% raw %}$context["post"] = Timber\Post();{% endraw %}

W tym momencie mamy dostęp do tekstu zdefiniowanego podczas tworzenia nowej strony. Taką samą konstrukcję należy zastosować jeżeli renderujemy np. widok dla jednego posta w single.php. Bez tego cały tekst czy custom fieldy nie pokażą się w widoku szablonu.

Następnym i ostatnim już krokiem jest wywołanie metody Timber::render() z dwoma argumentami: plikiem layoutu Twig i tablicą $context.

Cały kod pliku index.php powinien wyglądać następująco:

{% raw %}
$context = Timber::get_context();
$context['header'] = get_header();
$context['post'] = new Timber\Post();
$postargs = array(
"post_type" =&gt; "projekt",
"order" =&gt; "asc"
);
$context['projects'] = Timber::get_posts( $postargs );
Timber::render("twig-layouts/index-layout.twig", $context);
&nbsp;
{% endraw %}

Prosto i przyjemnie. W pliku index-layout.twig zajmujemy się już tylko i wyłącznie wyświetleniem odpowiednich rzeczy za podwójnych nawiasów lub {% raw %}`{% %}` {% endraw %}
{% raw %}&lt;section id="projects" class="section section--projects"&gt;
&lt;h2 class="section__title"&gt;Projects&lt;/h2&gt;
&lt;div class="section__content project__container"&gt;

{% for project in projects %}
&lt;div class="project"&gt;

&lt;img class="project__image" src="{{project.thumbnail}}" /&gt;
&lt;h5 class="project__title"&gt;{{ project.title }}&lt;/h5&gt;
{{ project.post_content }}

{% if project.project_url %}
&lt;a class="project__link" href="{{project.project_url}}"&gt;{{project.project_url}}&lt;/a&gt;
{% endif %}

&lt;/div&gt;
{% endfor %}

&lt;/div&gt;
&lt;/section&gt;
{% endraw %}
Wtyczka dobrze współgra z kolejnym must-have przy tworzeniu szablonów, a mianowicie Advanced Custom Field. Wystarczy wywołać metodę  post.get_field("nazwa") aby odwołać się do zdefiniowanego przez nas wcześniej pola.

W pliku .twig możemy oczywiście korzystać z funkcji extends czy include, co daje nam jeszcze więcej możliwości podzielenia szablonu na składowe.

{% raw %}
{% include 'twig-layouts/header-layout.twig' %}

&lt;body class="{{ body_class }}"&gt;
  {% include 'twig-layouts/partials/blog-navigation-layout.twig' %}
  &lt;header class="blog-header"&gt;
  &lt;div class="container"&gt;
    &lt;h1 class="blog-header__title"&gt;Blog &lt;/h1&gt;
    &lt;p class="blog-header__subtitle"&gt;junior web developera&lt;/p&gt;

  &lt;/div&gt;
  &lt;/header&gt;

{% endraw %}
W powyższym przykładzie cały kod nagłówka jest w header-layout a nawigacja w blog-navigation-layout.

Co znajduje się przy tagu otwierającym body?
{% raw %}&lt;body class="{{ body_class }}"&gt;{% endraw %}

Zmienna body_class znajdowała się już w tablicy $context. Timber ładuje wszystkie najczęściej używane w szablonie zmienne przy wywołaniu Timber::getContext(). Również w includowanym pliku header-layout.twig możemy odwołać się do tych zmiennych

{% raw %}&lt;meta name="description" content="{{site.description}}"&gt;
   &lt;link rel="stylesheet" href="{{site.theme.link}}/style.css" type="text/css" /&gt;{% endraw %}
Timber posiada też wbudowaną opcję wywoływania Wordpressowych funkcji szablonu takich jak wp_head.

Wystarczy dopisać
{% raw %}{{function('wp_head')}}{% endraw %}

W ten łatwy i przyjemny sposób możemy oddzielić logikę od prezentacji.


Zachęcam do testowania i sprawdzenia [oficjalnego repozytorium](https://github.com/timber/timber) wtyczki a także[ dokumentacji.](https://upstatement.com/timber/)


PS. Ciągle walczę z kolorowaniem i formatowaniem składni, tak więc niektóre z snippetów mogą zostać pozbawione tabulatorów i spacji.