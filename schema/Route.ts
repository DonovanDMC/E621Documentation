export default class Route {
    description: string;
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    name: string;
    path: string;
    static create(method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE", path: string, name: string) {
        const r = new Route();
        r.method = method;
        r.path = path;
        r.name = name;
        return r;
    }

    addParameter(location: "path" | "query" | "header" | "cookie", name: string, schema: any) {
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }
}
