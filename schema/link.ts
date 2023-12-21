import type { Category } from "./index.js";
import { readdir } from "node:fs/promises";

export const builtins = new Set(["CategoryDescription", "CategoryName", "Comments", "Order", "File", "ParentCategory"]);
const cache: Record<string, Category> = {};
const files = (await readdir(new URL("routes", import.meta.url))).filter(file => file.endsWith(/\.ts$/.test(import.meta.url) ? ".ts" : ".js"));
const map: Array<[route: string, text: string, path: string, file: string]> = [];
for (const file of files) {
    const path = new URL(`routes/${file.replace(/\.ts/, ".js")}`, import.meta.url).pathname;
    const r = await import(path) as Category;
    cache[path] = r;
    for (const key of Object.keys(r)) {
        if (builtins.has(key)) {
            continue;
        }

        map.push([key, r[key].Route.name, `${r.File ?? `${r.CategoryName.toLowerCase().replace(/\s/g, "_")}.md`}#${r[key].Route.name.toLowerCase().replace(/\s/g, "-")}`, path]);
    }
}

export function linkTo(name: string, from: string) {
    const link = map.find(([key]) => key === name);
    const file = map.find(([,,,path]) => path === from);
    const cached = cache[from];
    if (!link || !file || !cached) {
        console.warn(`Link not found: ${name}`);
        return name;
    }

    const dir = `${cached.File ?? `${cached.CategoryName.toLowerCase().replace(/\s/g, "_")}.md`}`;
    const [loc, hash] = link[2].split("#");
    if (dir === link[2].split("#")[0]) {
        return `[${link[1]}](./#${hash})`;
    }

    const level1 = file[2].split("/").length - 1;
    const level2 = link[2].split("/").length - 1;
    if (level1 >= 2 || level2 >= 2) {
        throw new Error("found double nested docs page");
    }
    if (level1 === level2) {
        return level1 === 0 || (link[2].split("/")[0] === file[2].split("/")[0]) ? `[${link[1]}](${loc.split("/")[1]}#${hash})` : `[${link[1]}](../${loc}#${hash})`;
    }

    return level1 === 0 && level2 === 1 ? `[${link[1]}](${loc}#${hash})` : `[${link[1]}](../${loc}#${hash})`;
}
