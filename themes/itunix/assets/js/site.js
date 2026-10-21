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


// yap projects https://github.com/skorotkiewicz/localist

  const projectsView = document.querySelector('#projects-view');
  if (projectsView) {
    const filters = projectsView.querySelector('form');
    const query = filters.elements.namedItem('query');
    const category = filters.elements.namedItem('category');
    const projectStatus = filters.elements.namedItem('status');
    const list = projectsView.querySelector('#projects-list');
    const message = projectsView.querySelector('#projects-status');
    const retry = projectsView.querySelector('.projects-retry');
    const statuses = { progress: 'In progress', complete: 'Completed' };
    let projects = [];

    function repositoryURL(value) {
      if (typeof value !== 'string') return null;
      const address = value.replace(/^git@github\.com:/i, 'https://github.com/');
      try {
        const url = new URL(address);
        if (!['https:', 'http:'].includes(url.protocol)) return null;
        url.pathname = url.pathname.replace(/\.git\/?$/, '');
        return url;
      } catch { return null; }
    }

    function renderProjects() {
      const words = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      const matches = projects.filter((project) => {
        const text = [project.name, project.description, project.category, ...project.tags].join(' ').toLocaleLowerCase();
        return (!category.value || project.category === category.value)
          && (!projectStatus.value || project.status === projectStatus.value)
          && words.every((word) => text.includes(word));
      });
      const fragment = document.createDocumentFragment();
      for (const project of matches) {
        const item = document.createElement('li');
        const heading = document.createElement('h2');
        heading.className = 'project-name';
        const repositories = [...new Set(project.repositories.map(repositoryURL).filter(Boolean).map((url) => url.href))];
        if (repositories.length) {
          const link = document.createElement('a');
          link.href = repositories[0];
          link.textContent = project.name;
          heading.append(link);
        } else { heading.textContent = project.name; }
        item.append(heading);
        const meta = document.createElement('p');
        meta.className = 'project-meta';
        meta.textContent = [project.category, statuses[project.status] || project.status, ...project.tags].filter(Boolean).join(' · ');
        item.append(meta);
        if (project.description) {
          const description = document.createElement('p');
          description.className = 'project-description';
          description.textContent = project.description;
          item.append(description);
        }
        if (repositories.length) {
          const links = document.createElement('p');
          links.className = 'project-repositories';
          for (const address of repositories) {
            const link = document.createElement('a');
            link.href = address;
            link.textContent = new URL(address).hostname === 'github.com' ? 'GitHub' : new URL(address).hostname;
            links.append(link);
          }
          item.append(links);
        }
        fragment.append(item);
      }
      list.replaceChildren(fragment);
      message.textContent = matches.length
        ? `${matches.length} ${matches.length === 1 ? 'project' : 'projects'}${matches.length !== projects.length ? ` of ${projects.length}` : ''}.`
        : (projects.length ? 'No projects match these filters.' : 'No public projects yet.');
    }

    async function loadProjects() {
      projectsView.setAttribute('aria-busy', 'true');
      message.textContent = 'Loading projects…';
      retry.hidden = true;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(projectsView.dataset.source, { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Projects unavailable');
        const data = await response.json();
        if (!Array.isArray(data.projects)) throw new Error('Invalid project list');
        projects = data.projects.filter((project) => project?.public === true && typeof project.name === 'string')
          .sort((a, b) => (Date.parse(b.updatedAt) || 0) - (Date.parse(a.updatedAt) || 0))
          .map((project) => ({
          name: project.name,
          category: typeof project.category === 'string' ? project.category : 'Other',
          status: typeof project.status === 'string' ? project.status : '',
          description: typeof project.description === 'string' ? project.description.trim() : '',
          tags: Array.isArray(project.tags) ? project.tags.filter((tag) => typeof tag === 'string') : [],
          repositories: Array.isArray(project.repositories) ? project.repositories : [],
        }));
        const categories = [...new Set(projects.map((project) => project.category))].sort((a, b) => a.localeCompare(b));
        const selected = category.value;
        category.replaceChildren(new Option('All categories', ''), ...categories.map((name) => new Option(name, name)));
        if (categories.includes(selected)) category.value = selected;
        filters.hidden = false;
        renderProjects();
      } catch {
        message.textContent = 'Projects could not load. Try again or open the project feed below.';
        retry.hidden = false;
      } finally {
        clearTimeout(timeout);
        projectsView.setAttribute('aria-busy', 'false');
      }
    }
    filters.addEventListener('submit', (event) => event.preventDefault());
    filters.addEventListener('input', renderProjects);
    filters.addEventListener('change', renderProjects);
    retry.addEventListener('click', loadProjects);
    loadProjects();
  }

// /yap projects


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
