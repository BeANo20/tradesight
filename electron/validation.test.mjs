import {describe,it,expect} from "vitest";
import validation from "./validation.js";
const {sourceRequest,externalUrl}=validation;
describe("IPC validation",()=>{it("rejects unexpected capture fields",()=>expect(()=>sourceRequest.parse({thumbnails:true,channel:"shell"})).toThrow());it("only allows HTTPS links",()=>{expect(externalUrl.safeParse("https://supremevalues.com").success).toBe(true);expect(externalUrl.safeParse("file:///etc/passwd").success).toBe(false)})});
