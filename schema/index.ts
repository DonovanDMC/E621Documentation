import { makeCategory, type IComment, type IRoute, tableOfContents  } from "./util.js";
import { builtins, linkTo } from "./link.js";
import { dirname } from "node:path";
import {
    access,
    copyFile,
    mkdir,
    readFile,
    readdir,
    rm,
    writeFile
} from "node:fs/promises";

interface StaticEntry {
    category: [name: string, parent?: string];
    content?: string; // description for basic index files
    file: string;
    source: string | null; // null if we've making a basic index file
}

const docsDir = new URL("../docs", import.meta.url).pathname;
await rm(docsDir, { recursive: true, force: true });
await mkdir(docsDir, { recursive: true });

const tocMap: Array<{ category: [name: string, parent?: string]; file: string; }> = [];
const staticDir = new URL("../static", import.meta.url).pathname;
const staticConfig = JSON.parse(await readFile(`${staticDir}/config.json`, "utf8")) as Array<StaticEntry>;
for (const { source, file, category, content } of staticConfig) {
    if (source !== null && !await access(`${staticDir}/${source}`).then(() => true, () => false)) {
        throw new Error(`Static file "${source}" does not exist.`);
    }
    const d = dirname(file);
    if (d !== ".") {
        await mkdir(`${docsDir}/${d}`, { recursive: true });
    }
    // typically empty index files
    // eslint-disable-next-line unicorn/prefer-ternary
    if (source === null) {
        await writeFile(`${docsDir}/${file}`, `${content ? `---\ndescription: ${content}\n---\n\n` : ""}# ${category[0]}`);
    } else {
        await copyFile(`${staticDir}/${source}`, `${docsDir}/${file}`);
    }
    tocMap.push({ category, file });
}

export type Category = Record<string, { Route: IRoute; }> & { CategoryDescription: string; CategoryName: string; Comments: Array<IComment>; File?: string; Order: Array<string>; ParentCategory?: string; };
const files = (await readdir(new URL("routes", import.meta.url))).filter(file => file.endsWith(/\.ts$/.test(import.meta.url) ? ".ts" : ".js"));
for (const file of files) {
    const path = new URL(`routes/${file}`, import.meta.url).pathname;
    const rel = new URL("..", import.meta.url).pathname;
    const r = await import(path.replace(/\.ts/, ".js")) as Category;
    for (const key of Object.keys(r)) {
        if (builtins.has(key)) {
            continue;
        }
        if (!r.Order.includes(key)) {
            throw new Error(`Route ${key} is missing from the Order array. (${path.slice(rel.length)})`);
        }
        if (!r[key].Route) {
            throw new Error(`Route ${key} is missing a Route property. (${path.slice(rel.length)})`);
        }
    }
    for (const key of r.Order) {
        if (!r[key]) {
            throw new Error(`Route ${key} is listed in Order array, but not exported. (${path.slice(rel.length)})`);
        }
    }
    if (r.File) {
        const d = dirname(r.File);
        await mkdir(`${docsDir}/${d}`, { recursive: true });
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const routes = Object.fromEntries((Object.entries(r).filter(([k]) => !builtins.has(k)) as Array<[string, { Route: IRoute; }]>).sort(([a], [b]) => r.Order.indexOf(a) - r.Order.indexOf(b)).map(([key, { Route }]) => [key, Route]));
    const category = makeCategory(r.CategoryName, r.CategoryDescription, r.Comments, routes).replace(/{{link:(.+)}}/g, (_, link: string) => linkTo(link, new URL(`routes/${file.replace(/\.ts/, ".js")}`, import.meta.url).pathname));
    await writeFile(`${docsDir}/${r.File ?? `${r.CategoryName.toLowerCase().replace(/\s/g, "_")}.md`}`, category);
    tocMap.push({ category: [r.CategoryName, r.ParentCategory], file: r.File ?? `${r.CategoryName.toLowerCase().replace(/\s/g, "_")}.md` });
}

const toc = await tableOfContents(tocMap);
await writeFile(`${docsDir}/SUMMARY.md`, `# Table of contents\n\n${toc}`);
