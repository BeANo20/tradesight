export type Item={id:string;name:string;aliases:string[];category:string;itemType:string;tradable:boolean;tradingValue:number|null;visualValue:number|null;demand:number|null;stability:string;flippability:string;riseChance:number|null;lastChange:string;source:string;notes:string;updatedAt:string};
export type OfferItem={item:Item;quantity:number};
export type Side="you"|"them";
export type Weights={trading:number;visual:number;demand:number;liquidity:number;risk:number};
export type Evaluation={you:Metrics;them:Metrics;score:number;label:string;action:"Accept"|"Negotiate"|"Decline"|"Hold";tone:"good"|"neutral"|"bad";explanation:string;counter:string};
export type Metrics={trading:number;visual:number;demand:number;liquidity:number;risk:number;items:number};
