const TYPE_TO_NAV = {
  essay: "writing",
  research: "research",
  poetry: "poetry",
  mun: "mun",
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/files": "files",
    "src/CNAME": "CNAME",
    "src/.nojekyll": ".nojekyll",
  });

  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  // Which nav entry a post belongs under.
  eleventyConfig.addFilter("typeToNav", (type) => TYPE_TO_NAV[type] || "writing");

  eleventyConfig.addFilter("navFor", (nav, key) => nav.find((n) => n.key === key));

  // The same page in the other language: a sibling nav entry for fixed pages,
  // the matching translationKey for posts, otherwise that language's home.
  eleventyConfig.addFilter(
    "altUrl",
    (pageKey, translationKey, lang, nav, collections) => {
      const other = lang === "en" ? "tr" : "en";
      if (pageKey) {
        const item = nav.find((n) => n.key === pageKey);
        if (item) return item[other].url;
      }
      if (translationKey) {
        const match = (collections["posts_" + other] || []).find(
          (p) => p.data.translationKey === translationKey,
        );
        if (match) return match.url;
      }
      return other === "tr" ? "/tr/" : "/";
    },
  );

  // The translated twin of a post, if the author has written one.
  eleventyConfig.addFilter("translationOf", (translationKey, lang, collections) => {
    if (!translationKey) return null;
    const other = lang === "en" ? "tr" : "en";
    return (
      (collections["posts_" + other] || []).find(
        (p) => p.data.translationKey === translationKey,
      ) || null
    );
  });

  // An archive listing: everything of `type` in this language, plus anything of
  // that type published only in the other language (flagged as foreign so the
  // work is never hidden just because no translation exists yet).
  eleventyConfig.addFilter("archive", (own, other, type) => {
    const ownItems = (own || []).filter((p) => p.data.type === type);
    const ownKeys = new Set(
      ownItems.map((p) => p.data.translationKey).filter(Boolean),
    );
    const foreignItems = (other || []).filter(
      (p) =>
        p.data.type === type &&
        !(p.data.translationKey && ownKeys.has(p.data.translationKey)),
    );
    return [
      ...ownItems.map((p) => ({ post: p, foreign: false })),
      ...foreignItems.map((p) => ({ post: p, foreign: true })),
    ].sort((a, b) => b.post.date - a.post.date);
  });

  eleventyConfig.addFilter("recent", (own, count) =>
    [...(own || [])].sort((a, b) => b.date - a.date).slice(0, count),
  );

  // Home page selection: whatever is marked `featured: true`, newest first.
  // Falls back to the most recent entries when nothing is pinned.
  eleventyConfig.addFilter("featured", (own, count) => {
    const sorted = [...(own || [])].sort((a, b) => b.date - a.date);
    const pinned = sorted.filter((p) => p.data.featured);
    return (pinned.length ? pinned : sorted).slice(0, count);
  });

  eleventyConfig.addFilter("displayDate", (post, lang) => {
    if (post.data.dateLabel) return post.data.dateLabel;
    return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(post.date);
  });

  eleventyConfig.addFilter("prettyDate", (date, lang) =>
    new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date)),
  );

  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString());

  eleventyConfig.addFilter("absoluteUrl", (url, base) =>
    new URL(url, base).toString(),
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
