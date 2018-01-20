---
title: Graphcool - szybki backend w GraphQL dla aplikacji
tags:
  - backend
  - graphql
id: 35
layout: post

categories: 
  - narzedzia
date: 2018-01-08 13:33:51
---

Podczas pisania projektów treningowych, nauki jakiejś nowej technologii czy po prostu w czasie pisania dla przyjemności często irytował mnie problem stawiania własnego backendu dla prostych aplikacji wymagających przechowywania danych i/lub autoryzacji. Tam, gdzie średnio sprawdzały się wygibasy z `localStorage` a gdzie potrzebowałem przechowywania danych brakowało mi w miare prostego i intuicyjnego rozwiązania, które pozwalałoby na szybkie postawienie bazy oraz RESTowego API do niej, aby w pełni skupić się na front endowej części aplikacji.

Testowałem kilka rozwiązań, między innymi Firebase od Google, które domyślnie stawia na komunikacje w czasie rzeczywistym między klientem a serwerem. Niestety parę rzeczy zupełnie mi tam nie pasowało, na przykład JSONowa struktura danych wymuszała na mnie przeniesienie logiki relacji tych danych do aplikacji, co zwiększało niepotrzebnie poziom skomplikowania kodu po stronie klienta. Dodatkowo nieintuicyjny mechanizm autoryzacji sprawił, że postanowiłem znaleźć coś innego.

W ramach nauki Angulara 5 postanowiłem napisać aplikację - prosty system do do zarządzania projektami. Na dzień dzisiejszy posiada podstawowe elementy składowe, takie jak logowanie, projekty, zadania, komentarze. Przez długi czas bez autentykacji i przechowywania tych danych dla róznych użytkowników aplikacja była praktycznie bezużyteczna. Przez moment zastanawiałem się nad napisaniem swojego prostego backendu w Express.js + Sequelize, a nawet w Laravelu, ale wszystkie te pomysły wymagały mimo wszystko sporego nakładu czasu. Przebrnąłem również przez rózne usługi BaaS aż w końcu znalazłem Graphcool.

### Graphcool

Graphcool jest po części frameworkiem a po części usługą BaaS [backend as a service] implementującą podobno przyszłościowy GraphQL. Aby nie wgłębiać się za bardzo w szczegóły techniczne napiszę tylko, że jest to standard projektowania backendu, który sprawia, że klient podłączą się tylko do jednego endpointu API i za pomocą odpowiedniego zapytania otrzymuje dokładnie te dane, które chce.

**Post jest tylko wstępem i pokazaniem sposobu pracy z Graphcool** a nie kompletnym i wyczerpującym tutorialem - po niego odsyłam do [dokumentacji graphcool](https://www.graph.cool/docs/) i [klienta Apollo](https://www.apollographql.com/client)

**Zaznaczam również, że dokumentacja posiada bardzo niejasną strukturę**. W dziale "Getting started" została pominięta najważniejsza część czyli odpytywanie API z naszej aplikacji. Opis tego znajduje się dopiero pod zakładką [REFERENCE > GraphQL API > Overview](https://www.graph.cool/docs/reference/graphql-api/overview-abogasd0go#making-requests-against-the-graphql-api)
gdzie zostały opisane dwie paczeki - prosta `graphcool-request` i bardziej rozbudowana biblioteka `ApolloClient`, z której osobiście skorzystałem. Oczywiście możemy wysłać żądanie po prostu jako parametr requesta, ale nie jest to ani zbyt czytelne, ani wygodne. 

Mimo kilku wad, dlaczego jest to najlepszy backend w chmurze jaki dotąd testowałem?

#### Prostota

Stworzenie konta i inicjalizacja projektu jest bardzo szybka i łatwa, a wersja darmowa posiada ograniczenia, które jednak w pełni wystarczą do prototypowania. Udostępnione narzędzie `graphcool-framework` zajmuje się niezbędną konfiguracją.

{% highlight shell %}
$ npm install -g graphcool
{% endhighlight %}
Po zainstalowaniu command line toola inicjalizujemy projekt w narzędziu za pomocą
{% highlight shell %}
$ graphcool init
{% endhighlight %}

Po ukończeniu processu scaffoldingu potrzebnych plików możemy zacząć budować strukture naszego backendu.

#### Struktura danych

Testowany przeze mnie wcześniej Firebase umożliwia stworzenie całkowiecie dowolnej struktury danych w dokumencie. To podejście ma wiele zalet, jednak osobiście przywykłem do pracy z jasno określonym modelem danych. Graphcool bazuje na twardym schemacie danych, jakie będziemy przechowywać w bazie.

W Graphcool typy definiujemy w pliku `types.graphql`. Przykładowy model wygląda tak

{% highlight text %}
type Comment @model {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  likes: Int @defaultValue(value: 0)
}
{% endhighlight %}

Jak widać na przykładzie modelu danych dla komentarza w aplikacji możemy zdefiniować rózne typy danych oraz w razie potrzeby ich domyślne wartości. 
W tym przypadku dodajemy:

- unikalne ID generowane automatycznie
- dwa typy DateTime zawierające informacje o czasie utworzenia i modyfikacji rekordu
- zawartość komentarza jako pole string
- polubienia danego komentarza

Pola oznaczone wykrzyknikiem przy typie informuje o tym, że nie może być ono puste. Dodatkowo możemy skonfigurować też domyślną wartość jaka będzie znajdowała się w danej kolumnie.



#### Relacje

Graphcool udostępnia mechanizm relacji, który deklarujemy wraz z typami w pliku `types.graphql`.

{% highlight text %}
type Comment @model {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  likes: Int @defaultValue(value: 0)

  author: User @relation(name: "CommentAuthor")
  task: Task @relation(name: "TaskComments")
}
{% endhighlight %}

Od tej pory możemy odpytać nasz pojedynczy endpoint w taki sposób, że dostaniemy dane autora komentarza i np. ID taska, do którego komentarz jest przypisany. W porównaniu do Firebase czy innych BaaS, gdzie dane to po prostu JSON ilość kodu i jego poziom skomplikowania znacząco spada, ponieważ nie musimy już robić zagnieżdżonych zapytan w celu pobrania (jak w tym przypadku) autora danego komentarza.

Typy umieszczamy na serwerze poprzez uruchomienie
{% highlight text %}
$ graphcool deploy
{% endhighlight %}
z uprzednio zainstalowanego pakietu `graphcool`

Graphcool automatycznie generuje akcje (queries oraz mutation, o których niżej) CRUD dla naszych modeli, co jest jedną z największych zalet tego BaaS.

## Praca z Graphcool

Aby w naszej aplikacji skorzystać z możliwości Graphcool możemy użyć biblioteki graphcool-request albo Apollo Client, która jest znacznie bardziej rozbudowana i służy jako wrapper do najczęściej używanych funkcji.

Istnieją rózne jej wersje dla najpopularniejszych frameworków. W moim przypadku jest to wariant z Angularem.

Dokumentacja dla tej biblioteki znajduje się [tutaj](https://www.apollographql.com/docs/angular/)

Aby wpiąć ją do naszej aplikacji potrzebujemy trochę rzeczy
{% highlight text %}
$ npm install apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql --save
{% endhighlight %}

Po konfiguracje dla Angulara odsyłam (tutaj)[https://www.apollographql.com/docs/angular/basics/setup.html], aby nie przeklejać niepotrzebnie całej strony.

## Operacje

Operacje w GraphQL (i Graphcool oczywiście) dzielą się na dwie kategorie
- queries, czyli po prostu GET
- mutations - wszystko pozostałe

Oprócz tego mamy też dostęp do funkcji serwerowych i zapytań autoryzacyjnych ale tego tematu nie będę poruszał tutaj.


#### Queries
W mojej aplikacji stworzyłem pliki przechowujące definicje tych akcji, które importuje do stworzonych serwisów. Składnia ich wygląda mniej więcej tak

{% highlight typescript %}
import gql from 'graphql-tag';
export const QAllProjects = gql`
      query allProjects{
        allProjects{
          id
          name
          description
          createdAt
          client {
            id
            name
          }
          author {
            lastName
            firstName
          }
        }
      }
    `;
{% endhighlight %}

Składnia GraphQL jest objęta backtickami oraz wywołaniem funkcji gql z pakietu `graphql-tag`, która odpowiada za odpowiednie przekonwertowanie zapytania do formy zrozumiałej dla endpointu GraphQL.

Z czego składa się takie zapytanie?
- najpierw określamy czy jest to query czy mutation
- następnie podawana jest nazwa operacji
- po nawiasie klamrowym jest wywołanie operacji automatycznie wygenerowanej przez Graphcool, w tym przypadku taka sama jak nazwa samego query
- po kolejnym nawiasie podajemy dane, które chcemy uzyskać z endpointu
- jeżeli pytamy dodatkowo o jakąś relacje, w danym typie danch dodajemy odpowiednie pole

Response takiego zapytania to obiekt JSON, pod którym znajduje się nazwa query oraz dane gotowe do przetworzenia.

{% highlight typescript %}
import { Apollo } from 'apollo-angular';
import { QAllProjects } from '../backend/graph.queries';
/* ... */
getAllProjects() {
    this.apollo.query({
      query: QAllProjects
    }).subscribe(({data}: any) => {
      this.utils.store.dispatch({
        type: ProjectActions.SET_PROJECTS,
        payload: data.allProjects,
      });
    }, this.utils.handleError);
  }
}
{% endhighlight %}

To jest wycinek z metody, która odpowiedzialna jest za pobranie wszystkich projektów.

### Mutations
Do zapytań (tak samo jak do mutacji) możemy oczywiście dodawać parametry. Następny przykład to mutacja, która dodaje komentarz do konkretnego zadania w systemie.

{% highlight typescript %}
export const MAddCommentToTask = gql`
  mutation addCommentToTask($taskId: ID!, $commentContent: String!, $userId: ID!) {
    createComment(
      taskId: $taskId,
      content: $commentContent,
      likes: 0,
      authorId: $userId
    ) {
      id
      task {
        id
      }
      content
      createdAt
      author {
        id
        firstName
        lastName
      }
    }
  }
`;
{% endhighlight %}

Operacja wygląda na trochę bardziej skomplikowaną ale wszystko jest bardzo intuicyjne. Najpierw deklarujemy nazwe naszej mutacji, jakie zmienne powinniśmy otrzymać z aplikacji oraz ich typy. Następnie wywołujemy predefiniowaną akcję `createComment`, do której przekazujemy parametry wraz z ID zalogowanego użytkownika (mechanizm autentykacji również jest dostepny w Graphcool). Kolejny krok to opisanie jakich danych oczekujemy z serwera. W moim przypadku są to ID, treść i data dodania komentarza a także ID taska oraz dane autora danego komentarza.

{% highlight typescript %}
this.apollo.mutate({
  mutation: MAddCommentToTask,
  variables: {
    taskId: newComment.taskId,
    commentContent: newComment.content,
    userId: this.utils.getLoggedInUserId()
  },
})
{% endhighlight %}

Tak wygląda wywołanie mutacji w aplikacji. Potrzebne zmienne przekazywane są w obiekcie `variables`.

### Dodatkowe funkcje

Graphcool oferuje również mechanizm autoryzacji (odsyłam do dokumentacji) oraz kilka typów funkcji serwerowych, dzięki którym można zrobić naprawdę wiele.
Oprócz mutacji oraz zapytań możemy definiować również zasady dostępu do danych według róznych kryteriów, np. roli użytkownika.

Tak wygląda przykładowy opis uprawnień zdefiniowany w pliku `graphcool.yml`

{% highlight yaml %}
permissions:
  - operation: Project.read
    query: ./src/permissions/Project.owner.graphql
    authenticated: true
{% endhighlight %}

Najpierw podajemy typ operacji, następnie adres do funkcji uruchamianej przed próbą dostępu do zasobu. Możemy również określić, czy dostęp wymaga od użytkownika bycia zalogowanym.

{% highlight text %}
query permitReadProjects($node_id: ID!, $user_id: ID!) {
  SomeProjectExists(
    filter: {
      id: $node_id,
      author: {
        id: $user_id
      }
    }
  )
}
{% endhighlight %}

Wycinek wyżej to tzw. permission query, czyli jak sama nazwa wskazuje zapytanie sprawdzające czy dany użytkownik ma dostęp do zasobu. Definiowany jest w osobnym pliku, który wraz z komendą `graphcool deploy` ląduje na serwerze.



Wszystkie dane w tabeli możemy dodać i dowolnie edytować przez panel dostepny po zalogowaniu się na konto Graph.cool

![Graphcool panel]({{ "/static/graphcool.png" | prepend: site.baseurl }})

W aplikacji dostępny jest także "playground", czyli miejsce, gdzie możemy testować różne kombinacje zapytań i mutacji a także jak GraphQLowe API będzie reagowało na zapytania od konkretnego userID, jak i wszystkie nasze definicje modeli, funkcji i uprawnień.

Oprócz standardowych zapytań do serwera Graphcool udostępnie także mechanizm subskrypcji w czasie rzeczywistym, ale jeszcze nie testowałem tego rozwiązania.


### Podsumowanie

Podsumowując cały wpis w kilku punktach - co należy zrobić aby wygenerować prosty backend dla naszej aplikacji?

1. założyć konto w serwisie [graph.cool](//graph.cool)
2. za pomocą npma zainstalować paczke `graphcool`
3. zainicjować projekt przez `graphcool init`
4. zdefiniować swoje typy danych oraz relacje w pliku `types.graphql`
5. `graphcool deploy`
6. pobrać klienta dla naszego środowiska/frameworku - `graphcool-request` albo `apollo-client` oraz wpiąć go do naszej aplikacji
7. utworzyć helpery dla zapytań / mutacji



#### Plusy

- możliwość bardzo szybkiego wygenerowania bazy danych z opisu w pliku `types.graphcool`
- generowane automatycznie akcje CRUD
- relacyjny model danych
- prostota w korzystaniu z API (queries, mutations)
- reguły autoryzacji
- limity, które w zupełności wystarczą do prototypowania

#### Minusy

- pierwsza konfiguracja może być nieco zawiła - brakuje jakiegoś starter kita, który załatwia niezbędną konfiguracje za nas (może stworzę taki starter pack w niedalekiej przyszłości?)
- niejasna dokumentacja i liczne braki - wielokrotnie musiałem szukać rozwiązania na oficjalnym forum Graphcool lub w issues na GitHubie i przejść przez sterty różnych tematów
- niejasne komunikaty błędów - np. `no required permission`, który nie podaje do jakiego konkretnie modelu zasobu nie mamy dostępu i jakie query/mutation wygenerowało błąd
- mutacje `delete` i `update` możemy uruchamiać tylko przez podanie ID danego rekordu. Jeżeli chcemy edytować jakiś rekord podając jego np. datę, musimy wykonać wcześniej pojedyncze query, które zwróci nam jego ID
- brak czegoś takiego jak `cascading deletes` - przykładowo w mojej aplikacji posiadam model `Task`, który posiada one-to-many z modelem `Comments`. Jeżeli usunę `Task` to wszystkie komentarze nadal pozostaną w bazie danych, ale ID taska dla relacji zostanie usunięte. W takim przypadku, muszę najpierw odpytać `allComments` według ID taska, usunąć je a dopiero później usunąć dany `Task`. Jeżeli relacja jest trochę bardziej skomplikowana to robi się niezłe spaghetti zapytań.
https://www.graph.cool/

Graphcool oferuje idealne wręcz narzędzie do szybkiego prototypowania aplikacji, które wymagają od nas jakiegoś rozwiązania na backendzie a niekoniecznie mamy czas lub ochotę pisać swój własny. Za pomocą kilkudziesięciu linijek jesteśmy w stanie postawić relacyjną bazę danych, wygenerować podstawowe operacje CRUD a także stworzyć autentykacje/autoryzacje do konkretnych zasobów. Oczywiście nie obyło się bez błędów i potknięć, ale jako, że jest to wersja < 1.0, można je wybaczyć.