(() => {
  'use strict';

  // Keep the existing mobile menu usable with a keyboard.
  const navigation = document.querySelector('#nav-trigger');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.checked) {
      navigation.checked = false;
      navigation.focus();
    }
  });

  // Copy controls add no extra padding or blank line to code blocks.
  if (navigator.clipboard && window.isSecureContext) {
    document.querySelectorAll('.highlight').forEach((block) => {
      const code = block.querySelector('pre code');
      if (!code) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          button.textContent = 'Copied!';
        } catch { button.textContent = 'Could not copy'; }
        setTimeout(() => { button.textContent = 'Copy'; }, 1800);
      });
      block.append(button);
    });
  }

  const tagWrapper = document.querySelector('#tag-wrapper');
  if (tagWrapper && typeof window.WordCloud === 'function') {
    const tags = JSON.parse(tagWrapper.dataset.tags);
    const urls = new Map(tags.map((tag) => [tag.name, tag.url]));
    tagWrapper.addEventListener('wordcloudstop', () => {
      tagWrapper.querySelectorAll('.tag-cloud-item').forEach((element) => {
        const name = element.textContent;
        const url = urls.get(name);
        if (!url) return;
        const link = document.createElement('a');
        link.href = url;
        link.textContent = name;
        link.style.color = 'inherit';
        element.replaceChildren(link);
      });
    });
    window.WordCloud(tagWrapper, {
      list: tags.map((tag) => [tag.name, tag.count]),
      weightFactor: 10,
      classes: 'tag-cloud-item',
    });
  }

  const input = document.querySelector('#search-input');
  if (!input) return;
  const form = document.querySelector('#search-container');
  const results = document.querySelector('#results-container');
  const status = document.querySelector('#search-status');
  const normalize = (value) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let pendingIndex;
  let generation = 0;
  let timer;

  function loadIndex() {
    if (!pendingIndex) {
      pendingIndex = fetch(input.dataset.index).then((response) => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      }).then((pages) => pages.map((page) => ({
        ...page,
        searchableTitle: normalize(page.title),
        searchableTags: normalize(page.tags.join(' ')),
        searchableContent: normalize(page.content),
      }))).catch((error) => { pendingIndex = undefined; throw error; });
    }
    return pendingIndex;
  }

  async function search() {
    const current = ++generation;
    const query = input.value.trim();
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    results.replaceChildren();
    if (!query) { status.textContent = ''; return; }
    status.textContent = 'Searching…';
    try {
      const pages = await loadIndex();
      if (current !== generation) return;
      const words = normalize(query).split(/\s+/).filter(Boolean);
      const matches = pages.map((page) => {
        let score = 0;
        for (const word of words) {
          if (page.searchableTitle.includes(word)) score += 10;
          else if (page.searchableTags.includes(word)) score += 5;
          else if (page.searchableContent.includes(word)) score += 1;
          else return { page, score: 0 };
        }
        return { page, score };
      }).filter((match) => match.score > 0).sort((a, b) => b.score - a.score);
      const shown = matches.slice(0, 10);
      status.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'}${matches.length > 10 ? ', showing the first 10' : ''}.`;
      const fragment = document.createDocumentFragment();
      if (!matches.length) {
        const item = document.createElement('li');
        item.textContent = 'No results found';
        fragment.append(item);
      }
      for (const { page } of shown) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = page.url;
        link.textContent = page.title;
        item.append(link);
        fragment.append(item);
      }
      results.append(fragment);
    } catch {
      if (current !== generation) return;
      status.textContent = 'Search could not load. Check your connection and try again.';
      const item = document.createElement('li');
      item.textContent = status.textContent;
      results.replaceChildren(item);
    }
  }
  input.addEventListener('input', () => {
    generation += 1;
    clearTimeout(timer);
    timer = setTimeout(search, 150);
  });
  form.addEventListener('submit', (event) => { event.preventDefault(); clearTimeout(timer); search(); });
  input.value = new URL(location.href).searchParams.get('q') || '';
  if (input.value) search();
})();
