---
layout: post
title: "Dysleksja"
date: 2017-09-12 16:53:50 +0200
year: "2017"
month: "2017/09"
categories:
  - Posts
tags:
  - polski
---

Przyjaciel z dysleksją opisał mi, jak odczuwa czytanie lektury. _Potrafi_ czytać, ale to wymaga sporej koncentracji, a litery wydają się "przeskakiwać".

Pamiętam jak czytałem artykuł o [typoglikemii](https://en.wikipedia.org/wiki/Typoglycemia). Pomyślałem, pewnie można to zrobić interaktywnie na stronie z Javascriptem? Z pewnością tak.

> Dysleksja charakteryzuje się trudnościami w nauce płynnego czytania i dokładnego rozumienia tekstu, mimo normalnej inteligencji. Obejmuje to trudności w zakresie świadomości fonologicznej, dekodowania fonologicznego, szybkości przetwarzania, kodowania ortograficznego, słuchowej pamięci krótkotrwałej, umiejętności językowych/zrozumienia słownego i/lub szybkiego nazywania.

> Zaburzenie czytania rozwojowego (DRD) jest najczęstszym upośledzeniem w uczeniu się. Dysleksja jest najczęściej rozpoznawanym zaburzeniem czytania, jednak nie wszystkie zaburzenia czytania są związane z dysleksją.

> Niektórzy postrzegają dysleksję jako coś odrębnego od trudności z czytaniem wynikających z innych przyczyn, takich jak nieneurologiczny niedobór wzroku lub słuchu, lub słaba lub nieodpowiednia umiejętność czytania. Istnieją trzy proponowane podtypy dysleksji poznawczej (słuchowa, wzrokowa i uważna), chociaż pojedyncze przypadki dysleksji lepiej wyjaśnić poprzez specyficzne zaburzenia neuropsychologiczne i współistnienie zaburzeń w uczeniu się (np. zaburzenia związane z brakiem uwagi/nadaktywnością, niepełnosprawnością matematyczną itp. Chociaż w literaturze naukowej uznawana jest za niepełnosprawność nauki językowów, dysleksja wpływa również na ekspresyjne umiejętności językowe. Naukowcy z MIT stwierdzili, że osoby z dysleksją wykazują się zaburzeniami rozpoznawania głosu.

_Źródło: [Wikipedia](https://en.wikipedia.org/wiki/Dyslexia)_

<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script type="text/javascript">

"use strict";

$(function(){

	var getTextNodesIn = function(el) {
	    return $(el).find(":not(iframe,script)").addBack().contents().filter(function() {
	        return this.nodeType == 3;
	    });
	};

	// var textNodes = getTextNodesIn($("p, h1, h2, h3"));
	var textNodes = getTextNodesIn($("*"));



	function isLetter(char) {
		return /^[\d]$/.test(char);
	}


	var wordsInTextNodes = [];
	for (var i = 0; i < textNodes.length; i++) {
		var node = textNodes[i];

		var words = []

		var re = /\w+/g;
		var match;
		while ((match = re.exec(node.nodeValue)) != null) {

			var word = match[0];
			var position = match.index;

			words.push({
				length: word.length,
				position: position
			});
		}

		wordsInTextNodes[i] = words;
	};


	function messUpWords () {

		for (var i = 0; i < textNodes.length; i++) {

			var node = textNodes[i];

			for (var j = 0; j < wordsInTextNodes[i].length; j++) {

				// Only change a tenth of the words each round.
				if (Math.random() > 1/10) {

					continue;
				}

				var wordMeta = wordsInTextNodes[i][j];

				var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
				var before = node.nodeValue.slice(0, wordMeta.position);
				var after  = node.nodeValue.slice(wordMeta.position + wordMeta.length);

				node.nodeValue = before + messUpWord(word) + after;
			};
		};
	}

	function messUpWord (word) {

		if (word.length < 3) {

			return word;
		}

		return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
	}

	function messUpMessyPart (messyPart) {

		if (messyPart.length < 2) {

			return messyPart;
		}

		var a, b;
		while (!(a < b)) {

			a = getRandomInt(0, messyPart.length - 1);
			b = getRandomInt(0, messyPart.length - 1);
		}

		return messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1);
	}

	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	function getRandomInt(min, max) {

		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	setInterval(messUpWords, 50);
});


</script>
