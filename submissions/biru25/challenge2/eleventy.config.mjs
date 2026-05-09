export default function (eleventyConfig) {
    // Copy static assets as-is into dist/
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/img": "img" });

    // Human-friendly date filter for posts
    eleventyConfig.addFilter("readableDate", (d) => {
        const date = d instanceof Date ? d : new Date(d);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    });

    // Year filter for footer
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            data: "_data",
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["md", "njk", "html", "11ty.js"],
    };
}
