import { makeObservable, observable } from 'mobx';

export class Application implements Common.IApplication {
  servicesFactories: Common.IDictionary<Common.ServiceFactory>;
  services: Common.IDictionary<any>;
  features: Common.IFeature[] = [];

  constructor() {
    this.servicesFactories = {};
    this.services = {};

    makeObservable(this, {
      features: observable,
    });
  }

  registerFeature(feature: Common.IFeature) {
    this.features = [...this.features, feature];
  }

  registerService<TService>(
    key: string,
    factory: Common.ServiceFactory<TService>,
  ): Common.IApplication {
    if (this.services[key]) {
      throw new Error(
        `A service instance with the same key is already instantiated: ${key}`,
      );
    }

    if (this.servicesFactories[key]) {
      throw new Error(
        `A service with the same key is already registered: ${key}`,
      );
    }

    this.servicesFactories[key] = factory;
    return this;
  }

  getService<TService>(key: string): TService {
    if (this.services[key]) {
      return this.services[key];
    }
    if (!this.servicesFactories[key]) {
      throw new Error(`No service with the provided key can be found: ${key}`);
    }

    this.services[key] = this.servicesFactories[key](this);
    return this.services[key];
  }
}
