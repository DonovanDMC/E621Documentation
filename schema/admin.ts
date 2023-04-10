import { Type } from "@sinclair/typebox";
import { NIL_UUID } from ".";

export namespace EditUser {
    export const NoParameters = Type.Object({
        success: Type.Literal(false),
        message: Type.Literal("param is missing or the value is empty: user\nDid you mean?  format\n               controller\n               action\n               id"),
        code: Type.Null()
    });

    export const MissingLevel = Type.Object({
        success: Type.Literal(false),
        message: Type.Literal("undefined method `>=' for nil:NilClass\n\n        is_verified? && self.level >= value && self.id.present?\n                                   ^^"),
        code: Type.String({ format: "uuid", examples: [NIL_UUID] })
    });

    export const TooLong = Type.Object({
        success: Type.Literal(false),
        message: Type.Literal("Validation failed: Blacklisted tags is too long (maximum is 150000 characters)"),
        code: Type.String({ format: "uuid", examples: [NIL_UUID] })
    });
}

export namespace GetAltList {}
export const EditUser = {
    method: "GET"
};
