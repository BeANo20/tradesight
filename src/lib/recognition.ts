/** Adapter boundary for local image templates. It intentionally returns no guess without a matching local template. */
export type Recognition={slot:number;candidateIds:string[];confidence:number};
export function confirmFrames(samples:Recognition[][]){const count=new Map<string,number>();samples.flat().forEach(x=>x.candidateIds.forEach(id=>count.set(`${x.slot}:${id}`,(count.get(`${x.slot}:${id}`)||0)+1)));return samples.at(-1)?.map(x=>({...x,candidateIds:x.candidateIds.filter(id=>(count.get(`${x.slot}:${id}`)||0)>=3)}))??[];}
