import { parameter, type IParameter, Types, Links } from "./util.js";

export default class CommonParameters {
    params: Array<IParameter> = [];
    static new(...params: ConstructorParameters<typeof CommonParameters>) {
        return new CommonParameters(...params);
    }

    id() {
        this.params.push(parameter.query("search[id]", Types.Number, `See ${Links.Search.ID}`));
        return this;
    }

    ipAddr(description: string, name = "ip_addr") {
        this.params.unshift(parameter.query(`search[${name}]`, Types.String, `${description}\n\nSee ${Links.Search.IP_ADDR}.`));
        return this;
    }

    limit() {
        this.params.push(parameter.query("limit", Types.Number, `See ${Links.Search.LIMIT}`));
        return this;
    }

    nested(level: number) {
        this.params = this.params.map(obj => ({ ...obj, description: obj.description.replace(/common\//, `${"../".repeat(level)}common/`) }));
        return this;
    }

    order(...orders: Array<string> | ReadonlyArray<string> | [Array<string> | ArrayLike<string>]) {
        if (Array.isArray(orders[0])) {
            orders = orders[0];
        }
        this.params.unshift(parameter.query("search[order]", Types.String, `The order of the returned results. One of: \`${orders.join("`, `")}\``));
        return this;
    }

    page() {
        this.params.push(parameter.query("page", Types.String, `See ${Links.Search.PAGE}`));
        return this;
    }
}

export function commonParameters() {
    return new CommonParameters();
}
