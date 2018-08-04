import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(@Inject('config') private config) {}
    /**
     * getConfig
     */
    public getConfig() {
        return this.config;
    }
    /**
     * Get the api url http://hola-api.com
     */
    public getApi() {
        return this.config.config.api;
    }
    /**
     * Get the version of the api example 'v1'
     */
    public getApiResourceVersion() {
        return this.config.config.resource.version;
    }
    /**
     * Get the resource point example 'gameofdrones'
     */
    public getApiResourceService() {
        return this.config.config.resource.service;
    }
}
