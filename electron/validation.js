const { z } = require("zod");
const sourceRequest = z.object({ thumbnails:z.boolean().optional() }).strict();
const externalUrl = z.string().url().refine(url=>new URL(url).protocol==="https:");
module.exports={sourceRequest,externalUrl};
