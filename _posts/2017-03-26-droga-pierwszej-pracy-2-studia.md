---
title: 'Droga do pierwszej pracy #2: Studia'
id: 208
layout: post
categories:
  - dajsiepoznac2017
  - DDPP
date: 2017-03-26 09:00:07
tags:
---

W poprzednim wpisie z serii “Droga do pierwszej pracy” wspomniałem co nieco o studiach i sposobie w jaki uczeni są potencjalni przyszli specjaliści z dziedziny programowania. Z oczywistych względów nie mam pojęcia o tym jak przedmioty związane z programowaniem wykładane są na innych uczelniach w Polsce. Opiszę więc tylko mój przypadek i swój punkt widzenia na pierwszy i drugi semestr na studiach informatycznych. Skupie się na minusach - bo jest ich niepokojąco dużo w porównaniu z plusami.

### Matematyka i C

Pierwszym językiem, z jakim miałem styczność na uczelni był C. Ten znienawidzony przeze mnie niegdyś język, który odstraszał mnie zarządzaniem pamięcią i niejasną wówczas mnie składnią (&, * inne symbole). Przez technikum informatyczne miałem lekką przewagę nad innymi, którzy po liceach humanistycznych czy mat-fizach dostali się na informatykę. Wielu z moich kolegów i koleżanek znalazło się tam totalnie przypadkiem, wielu przyznało się do tego, że w szkole średniej tłukło się im do głowy, że “informatyka to matematyka”, że będąc słabym z matematyki nawet nie warto myśleć o karierze w IT. Dlatego niektórzy przykładali się do matematycznych przedmiotów, a jeżeli ktoś już w trakcie wyboru profilu w szkoły średniej wiedział, że chce iść na studia informatyczne, wybierał profil matematyczno-fizyczny. Nie dałem się złapać na wszechobecne krzyki “jak informatyka to idź na matfiz” i wybrałem (słusznie) technikum informatyczne, gdzie w jeden rok nauczyłem się więcej niż w dwa lata na studiach.

Teraz w pełni zdaję sobie sprawę z tego, że pogląd jakoby bez matematyki nie było szans w programowaniu to jedna wielka **bzdura**. Poza nielicznymi stanowiskami w branży gamedevowej, czy wysoko specjalistycznymi posadami z pogranicza matematyki i fizyki, zdolności matematyczne większe niż znajomość tabliczki mnożenia, procentów i kolejności wykonywania działań w programowaniu nie przydają się na co dzień! W swojej pracy nigdy nie korzystałem z zagadnień algebry liniowej, a najbardziej skomplikowanym obliczeniem jakie wykonałem w JavaScripcie było wyliczenie środka trójkąta, ponieważ klient chciał aby na mapce Google Maps były widoczne wszystkie trzy jego biura w USA.

Możliwe, że istnieje do tego “wtyczka do dżejkłery” albo API ma gdzieś taką metodę, ale postanowiłem, iż zrobię to po swojemu i szybciej. Jedna wizyta na stronie z zadaniami matematycznymi i już miałem gotowy wzór na środek trójkąta.

Czy potrzebowałem do tego znajomości wzoru na pamięć czy zasad algebry? Nie. Wystarczyło trochę logicznego myślenia i przeanalizowania problemu.

Nie twierdzę, że znajomość trochę bardziej zaawansowanej matematyki nie jest na żadnym stanowisku, czy nawet w codziennym życiu, przydatna. Każdy gracz chciał kiedyś napisać swoją grę, a na pewno gracz-entuzjasta-programowania. W tym przypadku zetknie się on z masą problemów czysto matematycznych.
- Detekcja kolizji, czyli wyznaczenie jakiegoś obszaru i sprawdzenie, czy punkt innego obiektu znajduje się w nim
- Symulacja ruchu. Nawet w czymś tak z pozoru banalnym jak Arkanoid musimy zadbać o to, żeby piłka odbijała się w miarę naturalny sposób a do tego potrzebujemy już trochę matematyki/fizyki/geometrii.
- Pseudo-sztuczna inteligencja
- Prawdopodobieństwo.
- Pathfinding.

To tylko kilka problemów, które przychodzą mi do głowy. Wychodzę z założenia, że jeśli możemy coś znać to warto to znać, natomiast trzeba sobie zdać sprawę, czy na pewno to czego się chcemy uczyć jest w stu procentach przydatne. Zamiast nauki matematyki polecam naukę algorytmów lub wzorców projektowych i ich zastosowania, a jeszcze lepiej - pisania kodu. Jeżeli napotkamy jakiś problem wymagający użycia wzoru matematycznego, możemy go po prostu znaleźć w sieci albo skorzystać z gotowej biblioteki. W dzisiejszym świecie zdominowanym przez gigantyczne ilości informacji dostępne na wyciągnięcie ręki potrzeba zapamiętywania czegokolwiek staje się powoli zbędna, ponieważ jesteśmy w stanie w krótkim czasie znaleźć praktycznie wszystko co nas interesuje. Dlatego szkolne wbijanie do głowy wzorów matematycznych kończy się tak, że po krótkim czasie nikt ich nie pamięta, a co najgorsze nie wie skąd się wzięły, do czego służą i co tak naprawdę robią.

### Wracając do tematu…

Nauka C na studiach była dla wielu męką i barierą nie do przeskoczenia, przy której wielu rezygnowało z dalszej edukacji w tym kierunku i przenosiło się na jakąś turystykę i rekreację. W większości nikt nie wiedział po co mu to, co to daje, co z tym można zrobić, “kiedy w końcu napiszemy coś w okienkach”, “po co mi ten wiersz poleceń”. Proces nauki, jaki został wypracowany przez większą część życia został przewrócony do góry nogami, ponieważ nauka programowania nie polegała na tym samym co wszystkiego do tej pory, w szkole  - wkuwaniu formułek, wpisaniu się w klucz odpowiedzi i zapominaniu. Tutaj trzeba było przestawić się na zupełnie inną formę, co dla wielu okazało się nie do przejścia - wszystko co się robi należało rozbić na części pierwsze i **zrozumieć**, a nie nauczyć się na pamięć.

Niestety niektóre przedmioty nadal przypominały znienawidzone lekcje biologii czy matematyki. Na programowaniu obiektowym zadania opierały się na w 90% wyliczeniu jakiejś wartości matematycznej a w 10% na “odgadnięciu” liczby znajdującej się pod trzema zmiennymi wskazywanymi przez wskaźnik po 10 iteracjach pętli z trzema podchwytliwymi warunkami. Przy nauce struktur nikt nie wyjaśnił prosto i klarownie CZEMU TO MA SŁUŻYĆ. W trakcie przerabiania funkcji miałem wrażenie, że przynajmniej połowa studentów nie wiedziała po co one istnieją i w jaki sposób są przydatne.

Kolokwia pisane były na kartce, gdzie zadanie opierały się głównie na wpisaniu wyniku wywoływanej pajęczyny kodu, która z dobrymi praktykami i style guide nie miała wspólnego kompletnie nic. W końcu najważniejsze: żaden wykładowca nie wyjaśnił, nie pokazał czegokolwiek zachęcającego do nauki programowania. A przecież wystarczyło wziąć na warsztat jakąkolwiek aplikacje z githuba, uruchomić, pokazać kod. Ludzie rzadko kiedy potrafią znaleźć motywację, jeżeli uczą się czegoś nie-wiadomo-po co i nie widzą namacalnego efektu jaki uzyska się ucząc tego, a jeżeli jedyne co widzisz to łamigłówki ze wskaźnikami to o motywacji nie ma mowy. Jeżeli ktoś już zrozumiał wskaźniki to nadal nie rozumiał po co one tak naprawdę istnieją.

A propos githuba i gita - na studiach miałem wrażenie, że jest to jakaś wiedza tajemna, zakazana przez władze uczelni, ponieważ przez 3 lata żaden z profesorów nie wspomniał nawet o tym w jednym zdaniu. O kluczowej umiejętności każdego programisty niezależnie od specjalności. Zdaję sobie sprawę, że trzech najczęściej używanych komend i ich zastosowania można nauczyć się w jeden dzień w pracy, ale do cholery, dlaczego nikt tego nie zrobił właśnie na studiach, gdzie powinno się uczyć najważniejszych zagadnień z przyszłego zawodu? Wystarczyła godzina, aby pokazać ludziom jakieś repozytorium, uświadomić czym jest GIT i dlaczego jest tak ważnym. Zamiast tego dostawaliśmy kolejne pętle ze wskaźnikami, które nie niosły ze sobą żadnej wartości. Na zajęciach z Javy prowadzący zachęcał do zgrywania swoich programów na pendrive i przynoszenia na nich zadań domowych. Ręce opadają.

&nbsp;

### Programowanie obiektowe i inne przedmioty

&nbsp;

Jeżeli ktoś nie miał motywacji do nauki programowania po zajęciach z C, to po pierwszych zajęciach z programowania obiektowego stracił motywacje do życia. Koncept klasy zaprezentowany na przykładzie liczb zespolonych (!!!), maglowanie przez kilka zajęć przeciążania operatorów, brak jakiegokolwiek przykładu z “życia” czy realnej pracy. Nie da się wyjaśnić i wytłumaczyć komuś kompletnie abstrakcyjnego konstruktu jakim jest klasa w programowaniu na kompletnie abstrakcyjnym konstrukcie matematycznym jakim są liczby zespolone. Zamiast przekazania wiadomości w intuicyjny sposób, np. na przykładzie gry komputerowej, gdzie klasy można baaaardzo prosto wyjaśnić dostawaliśmy multum pojeć matematycznych zapisanych jako kod obiektowy. Nie było to programowanie obiektowe, raczej PROGRAMOWANIE W MATEMATYCE. Najczęściej powtarzanym pytaniem przez profesora było “czym jest konstruktor domyślny”. Ani słowa o wzorcach, dziedziczenie praktycznie nie wytłumaczone… w innej grupie kolokwia odbywały się na kartkach, gdzie prowadzący odejmował punkty za brak średnika na końcu linii.

W trzecim semestrze pojawił się przedmiot "języki hipertekstowe", które traktowały o CSSie, HTMLu i pobieżnie o PHP. Nie muszę chyba mówić, że ten ostatni uczony był jak 10 lat temu a prezentowany i wymagany od studentów kod był najgorszego sortu. Przy CSSie była o dziwo mowa o flexboxie, ale przy nim i przy HTMLu pojawiało się sporo informacji po prostu nie z tej epoki.

Po wybraniu "specjalizacji" np. administracja systemów komputerowych, miało się zajęcia z Pythona. Na następnym semetrze, do którego dotrwała tylko połowa roku, doszła rzeczywistość wirtualna w C# a dokładniej frameworku XNA. Z kolei inne zajęcia to był ASP.NET czy wstęp do Javy a na CMSach stawialiśmy Joomle, Moodle i Wordpressa. Innymi słowy - specjalizacja była specjalizacją tylko z nazwy, bo i tak dostawało się do zrobienia projekty z trzydziestu kompletnie różnych technologii, z których nie dało się wynieść wiele. Zamiast konkretnego języka i projektu, który realizowało się w zespole przez cały semestr, bombardowano nas przeróżnymi informacjami, od których ktoś niezaznajomiony z programowaniem dostawał oczopląsu. Zdaję sobie sprawę, że wykładowcy są wykładowcami a nie programistami z różnych względów, ale skoro pod sobą ma się 100 potencjalnych przyszłych specjalistów z branży informatycznej to chyba dobrze byłoby nieco odświeżyć swoją wiedzę, jeżeli wymaga się tego od studentów?

Takich przykładów mógłbym mnożyć, ale to tylko pokazuje jak oderwanym od rzeczywistych warunków pracy jest środowisko akademickie, które zamiast uczyć dobrych praktyk, konkretnych technologii i prezentować ciekawe projekty zniechęca młodych ludzi.

**Nie twierdzę jednak, że studia to 100% zło i nikomu nie odradzam pójścia na uczelnie wyższą. **Pomimo (niestety) znacznej większości jakim są wykładowcy z wiedzą sprzed kilkunastu lat, bez zacięcia pedagogicznego i pasji do nauczania, z błędnym postrzeganiem lub całkowitą nieznajomością rynku IT, zdarzają się inspirujący ludzie, którzy nawet najbardziej zagmatwany koncept wyjaśnić w prosty i przyjemny sposób. Dodatkowo dostajemy dostęp do wielu rzeczy, wiedzy i technologii. Możemy załapać się na programy pokroju Work&Travel, rekrutacje na staże, możemy korzystać z ogromnych zbiorów bibliotecznych a co najważniejsze - poznać ludzi. Kontakty to rzecz bardzo ważna i im wcześniej zbudujemy swoją sieć, tym lepiej. Sporo moich projektów zaczęło się właśnie od znajomości ze studiów. No i trzeba sobie zdać sprawę, że w większości przypadków to będą jedyni koledzy czy koleżanki w naszym bliskim otoczeniu, z którymi będziemy mogli porozmawiać o programowaniu. ;)

Mniej więcej w tym okresie z moim dobrym kolegą pogadaliśmy “o życiu” i stwierdziliśmy, że nie ma co liczyć na studia i trzeba wziąć sprawy w swoje ręce. Tak się złożyło, że ów kolega ma wujka, który pracuje jako Java Developer, tak więc postanowiliśmy zainteresować się tym językiem.

### Java, Ruby, Python...

Kilka tygodniu nauki Javy, z którą miałem też trochę styczności w technikum sprawiło, że zacząłem na to wszystko patrzeć z innej perspektywy. Odkryłem ogromne ilości wiedzy dostępnej za darmo w internecie, blogi, reddity, repozytoria, artykuły, fora… Zacząłem to wszystko chłonąc jednocześnie ucząc się składni i rozwiązując pierwsze trochę bardziej skomplikowane problemy. Obcy ludzie w sieci potrafili wytłumaczyć sens niektórych rzeczy 300 razy lepiej niż pracownik uczelni z trzema tytułami naukowymi. Dotarłem do różnych aplikacji i gier pisanych w Javie, przejrzałem oferty pracy… Wszystko zmieniło się o 180 stopni.

Postanowiłem napisać system rezerwacji hoteli z użyciem JFrame, niestety wpadłem w pułapkę nudnego projektu, który w sumie nie jest jakoś specjalnie emocjonujący ani użyteczny. Zabrałem się więc za pisanie gry - klona Arkanoida. Długi czas spędziłem na ogarnięciu podstawowych zasad rysowania na JPanelu i jak działa metoda repaint(). Projekt rozwijał się w miarę dobrze, cały czas coś poprawiałem i szukałem. Zdarzały się niestety dłuższe przestoje w nauce - wszyscy wiemy jak wygląda studenckie życie w Krakowie. Zacząłem też inne projekty, zabawy z dźwiękiem w Javie, próba napisania gry tekstowej… wszystko co wpadło do głowy i dało się przenieść na aplikacje. Popadłem w kolejną pułapkę, z którą miałem do czynienia już przy komponowaniu muzyki - zbyt wiele projektów, których nie kończyłem.

Entuzjazm chwilowo opadał, jednak cały czas motywowałem się nawzajem z kolegą. Na studiach starałem się wynieść jak najwięcej z innych przedmiotów, ale skupiałem się na nauce Javy na własną rękę. Jednocześnie poznawałem inne języki programowania z czystej ciekawości, czy aby jakiś kolejny nie okaże się “lepszy” w nauce.

Z jednej strony był to błąd, z drugiej coś dobrego. Nigdy nie wiemy na jakiej posadzie skończymy za parę lat. Warto znać inne techniki programowania, chociażby dla samego “obycia się w temacie”. Kiedy wykonywałem kolejne zadania na serwisach pokroju codecademy, w pewnym momencie w moim mózgu coś zaskoczyło. Zdałem sobie sprawę, że tak naprawdę we wszystkich językach, a przynajmniej tych najpopularniejszych chodzi o to samo, a język to tylko narzędzie w osiągnięciu celu.

Po kilkunastu tygodniach nadszedł czas na pierwszą konfrontację moich umiejętności z rzeczywistością podczas pierwszej rozmowy kwalifikacyjnej. O tym w następnym epizodzie.