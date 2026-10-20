---
title: Search
---

<form id="search-container" role="search" action="/search/" method="get">
    <p>Type here what you are looking for, maybe I wrote about it on my blog already?<br /><small>JavaScript is required for the searcher to work properly.</small></p>
    <input type="search" id="search-input" name="q" placeholder="enter your phrase here..." aria-label="Search the blog" aria-controls="results-container" aria-describedby="search-status" data-index="/index.json" autocomplete="off" />
    <p id="search-status" class="visually-hidden" role="status" aria-live="polite"></p>
    <ul id="results-container"></ul>
</form>
