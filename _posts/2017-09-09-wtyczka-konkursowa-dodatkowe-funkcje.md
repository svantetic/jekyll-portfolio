---
title: 'Wtyczka konkursowa: dodatkowe funkcje'
id: 280
layout: post
categories:
  - dajsiepoznac2017
date: 2017-05-31 12:08:00
tags:
---

We wtyczce na dzień dzisiejszy brakuje kilku najważniejszych funkcji związanych z konfiguracją zakładek i wyglądem. Trzy z nich przedstawię w tym wpisie.

#### Tło

Białe tło za kafelkami speed diala nie wyglądają zbyt zachęcająco, dlatego też w każdej wtyczce podobnej to tej tworzonej przeze mnie natknąłem się na opcje dodawania własnego tła. Do tej pory rozwiązywałem to w zły sposób.

Komponent BackgroundConfig zapisywał obrazek w chrome.storage.local a następnie emitował event do globalnego Store informujący główny komponent App o zmianie obrazka.
{% highlight javascript %}
saveBackgroundUrl() {
    let backgroundImageUrl = this.backgroundImageUrl;
    chrome.storage.local.set({
        backgroundImageUrl
    });
    Store.$emit('newBackgroundImageUrl', this.backgroundImageUrl);
    this.closeBackgroundConfigModal()
}
{% endhighlight %}

Ten z kolei pobierał z chrome.storage.local adres zapisanego tła dynamicznie bindował styl do głównego kontenera wtyczki.
{% highlight javascript %}fetchBackgroundImageFromStorage: function () {
               let self = this;
               chrome.storage.local.get('backgroundImageUrl', (backgroundImageUrl) => {
                   self.bgImageUrl = backgroundImageUrl.backgroundImageUrl || '';
               })
           },{% endhighlight %}>
&nbsp;

Wszystko działało w porządku dopóki nie dodawałem bardzo dużego obrazka - wtedy przy otwieraniu nowej karty pojawiał się lag wstrzymujący renderowanie się zakładek dopóki tło nie zostanie załadowane.

Jaka jest alternatywa dla takiego rozwiązania? Zamiast zapisywać tylko adres obrazka, zapiszę go w całości w pamięci podręcznej wtyczki.
{% highlight javascript %}
convertToBase64(image) {
             let canvas = document.createElement('canvas');
             canvas.width = image.width;
             canvas.height = image.height;
             let context = canvas.getContext('2d');
             context.drawImage(image, 0, 0);
             let dataUrl = canvas.toDataURL('image/png');
             return dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
           },
saveBackgroundUrl() {
               let backgroundImageUrl = this.backgroundImageUrl;
               let rawBackgroundImage = document.querySelector('#background-image-preview');
               let convertedImage = this.convertToBase64(rawBackgroundImage);

               chrome.storage.local.set({
                   'backgroundImageUrl' : convertedImage
               });
               Store.$emit('newBackgroundImageUrl', this.backgroundImageUrl);
               this.closeBackgroundConfigModal()
           }
       }{% endhighlight %}
Stworzyłem okno z podglądem obrazka, z którego wyciągam element DOM przesyłany do funkcji konwertującej tło do Base64\. Tam tworzony jest element canvas, na którym "malowane" jest zdjęcie. Ostatnim etapem jest wywołanie toDataURL na obiekcie context canvasa.

Niestety po próbie zapisania tego do pamięci Chrome zwraca błąd

`The canvas has been tainted by cross origin data`

&nbsp;

Spowodowane jest to pobraniem obrazka z zewnętrznej domeny.

Stack overflow podsunął rozwiązanie tego problemu poprzez dodanie atrybutu

`img.crossOrigin = 'anonymous`

ale również i to nie działa jak należy.

Muszę poszukać jeszcze innego sposobu na zapisanie tła w pamięci wtyczki aby nie ładować obrazka za każdym razem z zewnętrznej domeny.

#### Kolory

Wzorcowym ekranem nowej karty jest dla mnie rozwiązanie z Opery

[![](http://arkadiuszm.pl/wp-content/uploads/2017/05/opera-speed-dial.png)](http://arkadiuszm.pl/wp-content/uploads/2017/05/opera-speed-dial.png)

Oprócz tła nowego okna każda z zakładek ma przyporządkowany swój własny kolor ułatwiający identyfikacje adresu, do którego prowadzi. Nie można jednak nadać im swojego własnego. Zastanawia mnie w jaki sposób została rozwiązana kwestia automatycznego doboru koloru, który współgra w kolorystyką zapisanej witryny. W mojej wtyczce zastosuje po prostu bazę najpopularniejszych witryn wraz z ich dominującym kolorem i metodę wyszukującą dany adres.

Edycja kolorów jest w planach na kolejny release - w tym momencie wole skupić się na najważniejszych rzeczach.

#### Drag & Drop

Drag and drop to coś co chciałbym zaimplementować w rozszerzeniu, najlepiej korzystając tylko i wyłącznie z czystego natywnego API a nie z bibliotek, które mogłyby niepotrzebnie spowolnić i zwiększyć już tak duży rozmiar rozszerzenia.

Dzisiaj kończy się konkurs Daj Sie Poznać, tak więc wszelkie updaty będą już poza-konkursowe. Polecam śledzić bloga i mój profil na githubie, jeżeli jesteś zainteresowany dalszym rozwojem wtyczki lub będziesz chciał zostać beta-testerem.

[https://github.com/svantetic](https://github.com/svantetic)