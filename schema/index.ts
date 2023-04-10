import { Type } from "@sinclair/typebox";
import { writeFile } from "fs/promises";

export const NIL_UUID = "00000000-0000-0000-0000-000000000000";
export const AccessDenied = Type.Object({
    success: Type.Literal(false),
    reason: Type.Literal("Access denied"),
})
