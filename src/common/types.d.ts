declare namespace Common {
  export type ServiceFactory<TService = any> = (app: IApplication) => TService;

  export type IDictionary<TValue> = {
    [idx: string]: TValue;
  };

  export interface IApplication {
    features: Common.IFeature[];
    registerService<TService>(
      key: string,
      factory: ServiceFactory<TService>,
    ): IApplication;
    getService<TService>(key: string): TService;

    registerFeature(feature: IFeature);
  }

  export interface IFeature {
    key: string;
    label: string;
    path: string;
    getView(): React.ReactNode;
  }
}
