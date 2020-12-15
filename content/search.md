---
title: Search
---

<style>#search-input{width:90%;padding:15px;font-size:16px;margin-bottom:10px;}ul#results-container{list-style-type:circle;}ul#results-container li{padding:3px;}.post, .wrapper_post {min-height: 70vh;}</style>

<div id="search-container">
    <p>Type here what you are looking for, maybe I wrote about it on my blog already?<br /><small>JavaScript is required for the searcher to work properly.</small></p>
    <input type="text" id="search-input" placeholder="enter your phrase here..." />
    <ul id="results-container"></ul>
</div>

<script src="/js/simple-jekyll-search.min.js"></script>

<script>
    window.simpleJekyllSearch = new SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/index.json',
    searchResultTemplate: '<li><a href="{url}" title="{title}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: ['Welcome']
    })
</script>
