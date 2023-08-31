export class AliasTranslator {
    private static _instance: AliasTranslator;
    private _aliasMap: Map<string, string>;
    private constructor() {
        this._aliasMap = new Map<string, string>();
    }
    public static get Instance(): AliasTranslator {
        return this._instance || (this._instance = new this())
    }

    public getNamespace(alias: string): string | undefined {
        return this._aliasMap.get(alias) as string;
    }

    public setAlias(alias: string, namespace: string): void {
        this._aliasMap.set(alias, namespace);
    }

}