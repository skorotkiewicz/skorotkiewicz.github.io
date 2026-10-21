---
title: "Current projects"
description: "My current projects, their status, and source repositories."
layout: projects
---

<!-- projects https://github.com/skorotkiewicz/localist -->
<section id="projects-view" data-source="https://yap.sekor.eu.org/documents/128e05de4e1b3055dbad4163fa9106ceba199d9112e2065856ef23b852c5c1c5">
  <p>Things I'm building and maintaining.</p>
  <form class="projects-filters" hidden>
    <div class="projects-filter">
      <label for="projects-query">Search projects</label>
      <input type="search" id="projects-query" name="query" placeholder="Name, description, or tag" autocomplete="off" aria-controls="projects-list">
    </div>
    <div class="projects-filter">
      <label for="projects-category">Category</label>
      <select id="projects-category" name="category" aria-controls="projects-list"><option value="">All categories</option></select>
    </div>
    <div class="projects-filter">
      <label for="projects-status-filter">Status</label>
      <select id="projects-status-filter" name="status" aria-controls="projects-list">
        <option value="">All statuses</option>
        <option value="progress">In progress</option>
        <option value="complete">Completed</option>
      </select>
    </div>
  </form>
  <p id="projects-status" role="status" aria-live="polite"></p>
  <button type="button" class="projects-retry" hidden>Try again</button>
  <ul id="projects-list" class="projects-list" aria-label="Projects"></ul>
  <p class="projects-source">This project list is managed with <a href="https://github.com/skorotkiewicz/localist">Localist</a>. <a href="https://yap.sekor.eu.org/documents/128e05de4e1b3055dbad4163fa9106ceba199d9112e2065856ef23b852c5c1c5">View project feed</a></p>
  <noscript><p>Enable JavaScript to load the project list, or open the project feed above.</p></noscript>
</section>
