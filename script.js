/*
  SachAI site logic.
  Each top menu reads its content from a plain .txt file in /content.
  Non-technical editors can open those files in Notepad and edit them —
  no HTML or code required. See README.md for the exact format.
*/

const SECTIONS = {
  "consumer-apps": {
    title: "Our Consumer Apps",
    sub: "Apps we've built for everyday life, powered by AI that adapts to you.",
    file: "content/consumer-apps.txt",
  },
  "business-apps": {
    title: "Our Business Apps",
    sub: "Tools that take repetitive work off a team's plate so people can do the parts only people can do.",
    file: "content/business-apps.txt",
  },
  "services": {
    title: "Our Services",
    sub: "How we work with clients who want an app or an AI feature built for them.",
    file: "content/services.txt",
  },
  "demos": {
    title: "Demos",
    sub: "Try a few things we've built, right in your browser.",
    file: "content/demos.txt",
  },
};

const cache = {};

function parseEntries(raw) {
  return raw
    .split(/\n\s*---\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const entry = {};
      block.split("\n").forEach((line) => {
        const m = line.match(/^\s*(Title|Tagline|Description|Link)\s*:\s*(.*)$/i);
        if (m) entry[m[1].toLowerCase()] = m[2].trim();
      });
      return entry;
    })
    .filter((e) => e.title);
}

function renderCards(entries) {
  const area = document.getElementById("card-area");
  if (!entries.length) {
    area.innerHTML = '<p class="state-msg">Nothing here yet — add entries to the matching .txt file in /content.</p>';
    return;
  }
  const grid = document.createElement("div");
  grid.className = "card-grid";
  entries.forEach((e) => {
    const card = document.createElement("article");
    card.className = "card";
    const linkHtml = e.link
      ? `<a class="card-link" href="${escapeAttr(e.link)}" target="_blank" rel="noopener">Learn more</a>`
      : "";
    card.innerHTML = `
      <h3>${escapeHtml(e.title)}</h3>
      ${e.tagline ? `<p class="tag">${escapeHtml(e.tagline)}</p>` : ""}
      ${e.description ? `<p class="desc">${escapeHtml(e.description)}</p>` : ""}
      ${linkHtml}
    `;
    grid.appendChild(card);
  });
  area.innerHTML = "";
  area.appendChild(grid);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

async function loadSection(key) {
  const section = SECTIONS[key];
  document.getElementById("panel-title").textContent = section.title;
  document.getElementById("panel-sub").textContent = section.sub;
  const area = document.getElementById("card-area");
  document.getElementById("panel-count").textContent = "";

  if (cache[key]) {
    renderCards(cache[key]);
    document.getElementById("panel-count").textContent = countLabel(cache[key].length);
    return;
  }

  area.innerHTML = '<p class="state-msg">Loading…</p>';
  try {
    const res = await fetch(section.file, { cache: "no-store" });
    if (!res.ok) throw new Error("File not found: " + section.file);
    const raw = await res.text();
    const entries = parseEntries(raw);
    cache[key] = entries;
    renderCards(entries);
    document.getElementById("panel-count").textContent = countLabel(entries.length);
  } catch (err) {
    area.innerHTML =
      '<p class="state-msg">Couldn\'t load this section. If you\'re viewing this file directly on your computer, run it through a local web server instead — see README.md.</p>';
    console.error(err);
  }
}

function countLabel(n) {
  return n === 1 ? "1 entry" : `${n} entries`;
}

function moveIndicator(btn) {
  const indicator = document.getElementById("tab-indicator");
  const tabs = document.getElementById("tabs");
  const tabsRect = tabs.getBoundingClientRect();
  const rect = btn.getBoundingClientRect();
  indicator.style.left = rect.left - tabsRect.left + "px";
  indicator.style.width = rect.width + "px";
}

function initTabs() {
  const buttons = Array.from(document.querySelectorAll("#tabs button"));
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      moveIndicator(btn);
      loadSection(btn.dataset.section);
      history.replaceState(null, "", "#" + btn.dataset.section);
    });
  });

  const initial =
    buttons.find((b) => b.dataset.section === location.hash.replace("#", "")) ||
    buttons[0];
  initial.setAttribute("aria-selected", "true");
  buttons.forEach((b) => {
    if (b !== initial) b.setAttribute("aria-selected", "false");
  });
  requestAnimationFrame(() => moveIndicator(initial));
  loadSection(initial.dataset.section);

  window.addEventListener("resize", () => {
    const active = buttons.find((b) => b.getAttribute("aria-selected") === "true");
    if (active) moveIndicator(active);
  });
}

document.addEventListener("DOMContentLoaded", initTabs);
