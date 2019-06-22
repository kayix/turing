import { IProducts } from './products.interface';
export declare class ISearch extends IProducts {
    readonly query_string: string;
    readonly all_words: string;
}
