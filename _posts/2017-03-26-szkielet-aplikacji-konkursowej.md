---
title: Szkielet aplikacji konkursowej
id: 194
categories:
  - dajsiepoznac2017
date: 2017-03-26 00:11:19
tags:
---

W [poprzednim poście](http://arkadiuszm.pl/2017/03/anatomia-rozszerzenia-chrome/) opisałem z grubsza zasadę działania rozszerzenia w Chrome. [Dwa posty do tyłu](http://arkadiuszm.pl/2017/03/aplikacja-konkursowa-wstepny-design/) zaprezentowałem wstępny design od strony frontu. Teraz nadszedł czas na zebranie tego do kupy i stworzenie prototypu, który sprawdzi czy rozszerzenie będzie ładowane przez przeglądarkę i czy zastąpi domyślną stronę startową. Na dodatek kod boilerplate z minimalną wymaganą konfiguracją umieszczę w repozytorium na GitHubie. A nuż ktoś z tego skorzystsa.

### Środowisko

W projekcie używam następujących narzędzi:

*   Sublime Text wraz z niezbędnym pakietem wtyczek

    *   Emmet
    *   Sidebar Enhancement
    *   Material Theme
    *   Advanced New File

*   Gulp

    *   gulp-sass
    *   gulp-uglify do minifikacji stylu i skryptów, ponieważ celuje w jak najmniejszy rozmiar

*   VueJS
*   Framework do testów
Jednak spróbuje z Vue, zobaczymy jak się to rozwinie. Dodatkowo chciałbym użyć tutaj Karma/Jasmine/Mocha + Chai do testów, ale jestem jeszcze pewien jak to rozwiązać w przypadku VueJS, a raczej która z bibliotek dobrze współgra z tym frameworkiem.

Cała reszta bez zbędnych fajerwerków - lubię składnie SCSS i uważam to za absolutny standard we współczesnym front-endzie, dlatego z pomocą przyjdzie gulp-sass.

Dlaczego nie webpack? Browserify? Babel?

Odpowiedź jest prosta: zbundlowany plik prosto z webpacka zawierający cztery komponenty Vue miał 6000 linijek kodu. Takie coś wczytuje się _troszkę_ wolniej, tak więc cała logika aplikacji będzie znajdowała się w jednym pliku extension.js.

### Struktura katalogów

Struktura katalogów wygląda na ten moment tak:

![struktura](http://arkadiuszm.pl/wp-content/uploads/2017/03/struktura.png)

&nbsp;

W folderze ```dist``` znajdują się podkatalogi css i js, a w nim samym manifset i speed dial. Dlaczego tak? A no dlatego, że w czasie dodawania rozszerzenia do chrome musimy wskazać katalog, gdzie znajduje się zarówno manifest jak i jego zależności. Jeżeli pliki byłyby w głównym rozszerzeniu, dodałbym również gigantyczny node_modules i całą resztę.

&nbsp;

Gulpfile prezentuje się następująco
<pre class="EnlighterJSRAW" data-enlighter-language="js">const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const config = {
  scss: {
    srcDir: './scss/**/*.scss',
    destDir: 'dist/css/'
  },

  js: {
    srcDir: './js/**/*.js',
    destDir: 'dist/js/'
  }
}

gulp.task('sass', () =&gt; {
  return gulp.src(config.scss.srcDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.scss.destDir))
});

gulp.task('js', () =&gt; {
  return gulp.src(config.js.srcDir)
    // .pipe(uglify())
    .pipe(gulp.dest(config.js.destDir))
});

gulp.task('watch', () =&gt; {
  gulp.watch(config.scss.srcDir, ['sass']);
  gulp.watch(config.js.srcDir, ['js']);
});</pre>
Uglify jest zakomentowany, ponieważ zwracał nieokreślony błąd podczas uruchomienia i średnio mam ochotę debugować to o tej porze.

Testowy extension.js to alert z hello wordem
<pre class="EnlighterJSRAW" data-enlighter-language="js">let a = 'helloa chrome';
alert(a);</pre>
(jeszcze z błędem)

Index po prostu wczytuje te wymagane składniki i posiada randomowy nagłówek h1, a styl to dzieło sztuki debugowania ścieżek do plików
<pre class="EnlighterJSRAW" data-enlighter-language="css">body {
  background: orange;
  color: white;
  margin: 0;
  padding: 0;
}</pre>

###  Jak to zainstalować?

Aby zainstalować wtyczkę, która nie znajduje się w specjalnym formacie .crx, należy przejść do panelu roszerzeń chrome przez chrome://extensions lub przez panel opacji, włączyć developer mode  i wybrać:

![](http://arkadiuszm.pl/wp-content/uploads/2017/03/wczytywanie.png)

Po załadowaniu testowego kodu i potwierdzeniu podmiany strony startowej oczom powinien ukazać się taki oto widok

![](http://arkadiuszm.pl/wp-content/uploads/2017/03/hi-300x123.png)

### Podsumowanie

Jak widać na załączonych kodach i obrazkach nie trzeba wiele, aby móc rozszerzyć Chrome o własną funkcjonalność. W następnym odcinku skupie się już na konkretach mając dobry punkt wyjścia.

Repozytorium

[http://github.com/svantetic/simple-speed-dial](http://github.com/svantetic/simple-speed-dial)

Feed z bloga

[http://arkadiuszm.pl/blog/feed](http://arkadiuszm.pl/blog/feed)