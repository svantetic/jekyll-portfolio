---
title: Single File Components w VueJS na przykładzie listy zadań
id: 154
categories:
  - dajsiepoznac2017
  - vue
date: 2017-03-14 19:25:28
tags:
---

W tym poście chciałbym opisać proces przepisywania projektu treningowego w ramach nauki frameworku VueJS, który przypadł mi do gustu z wszystkich jakie dane było mi przetestować (Backbone, AngularJS, React i Ember) a także postaram się przybliżyć coś co nazwane zostało Single File Components. Ale po kolei.

### Dlaczego akurat Vue?

W React odrzuca mnie JSX oraz konieczność zainstalowania trzydziestu pięciu tysięcy node modułów aby zacząć cokolwiek w nim pisać, w Backbone nie przypasowała mi kwestia renderowania widoków i kolekcji, Ember wydaje mi się bardzo ciężki i niezbyt przyszłościowy. W Angularze 1 napisałem kiedyś prostą apkę w ramach FreeCodeCamp, ale w świetle wersji nr 2, która używa nielubianego przeze mnie TypeScripta, nie wydawał mi się dobrą opcja. Vue z kolei przemawia do mnie prostotą, niskim progiem wejścia, wygodą w użyciu, Single File Components i ogólną przyjemnością w pisaniu. Nadal ma się wrażenie, że piszemy w JavaScripcie, a nie w jakiejś HTMLowej hybrydzie czy w typowanej wersji JSa. Dodatkowo wprowadzenie do Vue na Laracasts.com jest bardzo zachęcające, ponieważ pan Jeff tłumaczy wszystko w bardzo przystępny sposób.

### Dlaczego lista Todo?

Skoro wszyscy backendowcy mają kiedyś w ciągu swojego życia muszą napisać CMSa, to na frontendzie odpowiednikiem systemu zarządzania treścią jest chyba lista TODO. Poza tym uważam, że jest to jeden z najlepszych prostych projektów, w którym możemy przetestować jakąś technologie bez zbytniego nadwyrężania głowy, a przecież nauka czegoś nowego powinna być przyjemna.

### Czym są Single File Components?

W mojej treningowej aplikacji dostępnej podlinkowanej na samym dole artykułu, znajduje się komponent Vue zdefiniowany w głównym pliku aplikacji - niech to będzie main.js.
<pre class="EnlighterJSRAW" data-enlighter-language="null">var todo = {
  name: 'todo',
  props: ['name', 'text', 'id'],
  template: `&lt;ul class="todo__element"&gt;
              &lt;li class="todo__detail todo__name"&gt; {{ name }}&lt;/li&gt;
              &lt;li class="todo__detail todo__text"&gt; {{ text }}&lt;/li&gt;
              &lt;li class="todo__detail todo__action"&gt; 
              &lt;button class="todo__delete" @click="completeTodo()"&gt;Complete&lt;/button&gt; &lt;/li&gt;
              &lt;/ul&gt;`,
  methods : {
    completeTodo : function() {
      window.EventBus.$emit('todo_completed');

    }
  }

}</pre>
W obiekcie Todo znajduje się kilka zmiennych.

Name przechowuje nazwę komponentu, z której możemy skorzystać wywołując go w innym komponencie

Tablica props, zawierająca atrybuty, które możemy przekazać z parent componentu. W tym przypadku są to pola odpowiedzialne za nazwę, treść i id naszego obiektu Todo przekazywane z nadrzędnego komponentu todo-list.

Methods zawiera funkcje wywoływane z środka naszego szablonu. W tym przypadku completeTodo odpowiadało za emitowanie eventu ukończenia jakiegoś eventu do rodzica, który zajmował się usuwaniem elementu z localStorage przeglądarki. EventBus to coś w rodzaju pseudo-Vuexa, czyli implementacji architektury Flux w VueJS.  Jeszcze nie miałem okazji pracować z Vuexem, ponieważ w tak małej aplikacji, która przechowuje conajwyżej dwa stany elementów TODO nie jest to zbyt sensowne.

Template, czyli główny szkopuł. Doszło tutaj do sytuacji niemal wyjętej z Reacta, czyli pisanie HTMLa w pliku skryptu JS pomiędzy odwróconymi apostrofami z ES6\. Bez backticków HTML musiał być pisany albo w jednej linii albo z znakiem \n na końcu każdej linijki, co z oczywistych względów jest nieczytelne. Poza tym informacje o stylu są zapisane w style.scss, do którego nie mamy siłą rzeczy wglądu póki nie uruchomimy dwukolumnowego layoutu w edytorze.

A co gdyby cały nasz komponent, czyli kod szablonu HTML, logika Vue i styl w Sassie znajdował się w jednym pliku z rozszerzeniem .vue?

Na pomoc przychodzą Single File Components, dzięki czemu wszystko staje się trochę bardziej przyjazne dla developera.
<pre class="EnlighterJSRAW" data-enlighter-language="html">&lt;template&gt;
&lt;ul class="todo__element"&gt;
              &lt;li class="todo__detail todo__name"&gt; {{ name }}&lt;/li&gt;
              &lt;li class="todo__detail todo__text"&gt; {{ text }}&lt;/li&gt;
              &lt;li class="todo__detail todo__action"&gt; &lt;button class="todo__delete" @click="completeTodo()"&gt;Complete&lt;/button&gt; &lt;/li&gt;
              &lt;/ul&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name: 'todo',
  props: ['name', 'text', 'id'],
  methods : {
    completeTodo : function() {
      window.EventBus.$emit('todo_completed');
    }
  }
}
&lt;/script&gt;
&lt;style lang="scss"&gt;
.todo {
  &amp;__head {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
  &amp;__element {
    @extends .todo__head;
  }
 ...

&lt;/style&gt;</pre>
Ale jak to tak, w jednym pliku i widok i logika? Nie o to PHPowcy walczyli!

Cóż, takie dysputy polecam zainteresowanym internetowymi wojnami, ja po prostu zostanę przy takim sposobie pisania aplikacji.

Czym taki zapis różni się od tego standardowego sposobu, prosto w pliku .js? Po pierwsze - nie przypisujemy całej instancji komponentu do zmiennej, ani nie wywołujemy konstruktora Vue() lub Vue.component(). Zamiast tego cała logika znajduje się w nawiasach exports default {}, czyli polecenia eksportującego nasz kod do modułu możliwego do zaimportowania w innym pliku .vue lub entry poincie aplikacji.

Jeżeli chcemy skorzystać z istniejącego modułu, po prostu używamy "import". Tutaj przykład z nadrzędnego komponentu renderującego kolejne zadania z otrzymywanej przez atrybut 'todos' listy zadań
<pre class="EnlighterJSRAW" data-enlighter-highlight="8">&lt;template&gt;
  &lt;div class="todo__list"&gt;
          &lt;todo v-for="singleTodo in todos" :name="singleTodo.name " :id="singleTodo.id" :text="singleTodo.text" &gt;&lt;/todo&gt;
            &lt;/tr&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import todo from './todo.vue';
export default {
  name: 'todo-list',
  props: ['todos'],
  components: {
    'todo' : todo
  }

}
&lt;/script&gt;
&lt;style lang="scss"&gt;
&lt;/style&gt;</pre>
Należy też pamiętać, że w VueJS tworząc nowy komponent (nawet jeśli nie używamy single file components) data musi być funkcją zwracającą obiekt z danymi, a nie po prostu obiektem. Przykład z głównego komponentu mojej listy todo, gdzie funkcja data zwraca defaultowe, przykładowe TODO, jeżeli użytkownik w localStorage przeglądarki nie posiada już wcześniej zapisanych zadań:
<pre class="EnlighterJSRAW" data-enlighter-language="null">data: function() {
   return {
   todosFile: [{
     id: 1,
     name: "Mark",
     text: "Do something productive",
     completed: false
   }, {
     id: 2,
     name: "Ann",
     text: "Send some important mails",
     completed: false
   }]
 }},</pre>
&nbsp;

### Jak się to za to zabrać?

Najprostszym sposobem będzie skorzystanie z gotowego rozwiązania w postaci **vue-cli**, które znajduje się pod adresem
<pre>https://github.com/vuejs/vue-cli</pre>
lub za pomocą npma
<pre>npm install -g vue-cli</pre>
Vue-cli jak sama nazwa wskazuje to command line interface zawierający w sobie kilka predefiniowanych generatorów scaffoldujących naszą aplikacje. Najprotszym rozwiązaniem jest webpack-simple, który po zainstalowaniu uruchomimy poleceniem
<pre>vue init webpack-simple nazwa-projektu</pre>
Dostajemy wtedy gotowy package.json i config webpacka. Co nam to daje? A no możliwość kompilacji naszych single file components w plikach .vue do jednego dużego, gigantycznego wręcz bundle.js. Jakby tego było mało dostajemy też webpackowy serwer developerski z hot-reloadem modułów, czyli zmiany wprowadzane w naszych komponentach w czasie prawie-rzeczywistym lądują w przeglądarce bez przymusu wciskania CTRL+R.
<pre>npm run dev</pre>

### Jak wygląda struktura katalogów i jakie pułapki tam się znajdują?

![](http://arkadiuszm.pl/wp-content/uploads/2017/03/vue-cli.png)

&nbsp;

Struktura jest bardzo prosta. W src defaultowo znajduje się już przykładowy plik .vue oraz entry point naszej aplikacji, w którym musimy zaimportować główny komponent. **Należy pamiętać o wywołaniu funkcji render w środku komponentu i zdefiniowaniu "el" określającego punkt zamontowania naszej aplikacji w głównym pliku index.html**. W moim przypadku plik main.js wygląda tak:
<pre class="EnlighterJSRAW" data-enlighter-language="js">import Vue from 'vue'
import App from './App.vue'
window.EventBus = new Vue()
new Vue({
  el: '#app-container',
  render: h =&gt; h(App)
})
</pre>
&nbsp;

Jeżeli komuś nie podoba się zaproponowany układ folderów można zmienić to w configu webpacka.
<pre class="EnlighterJSRAW" data-enlighter-language="js">entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },</pre>
Przy kompilacji komponentów spotkałem się z problemem związanym z SCSSem.

Webpack odwoływał się do niestniejącego modułu vue-style-loader. W takim wypadku należy uruchomić
<pre>npm install --save-dev vue-style-loader</pre>
W przypadku innych problemów należy śledzić konsolę przeglądarki, która zwraca bardzo obszerne opisy błędów.

### Komu to potrzebne?

Wydaje mi się, że ostatni wzrost popularności Vue wpłynie na sposób w jakim pisane są obecnie aplikacje w tymże frameworku i ogólny trend modularyzacji JavaScriptu sprawi, iż Single File Components staną się standardem. Nie wiem czy podobna funkcja istnieje w konkurencyjnych frameworkach, ale jeśli nie to Vue posiada w rękawie bardzo mocną kartę. Jeżeli ktoś nie miał z Vue wcześniej do czynienia, lub myślał, że to "just another JavaScript framework" Single File Components powinny być ogromną zachętą do przestowania go.

O Vue na pewno napiszę jeszcze przy innej okazji a tymczasem parę linków:

Dokumentacja Vue

[https://vuejs.org/v2/guide/](https://vuejs.org/v2/guide/)

Repo Vue-cli

[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

Repo z projektem

[https://github.com/svantetic/vuejs-todo](https://github.com/svantetic/vuejs-todo)

GitHub pages z buildem listy zadań

[https://svantetic.github.io/vuejs-todo/](https://svantetic.github.io/vuejs-todo/)

### 