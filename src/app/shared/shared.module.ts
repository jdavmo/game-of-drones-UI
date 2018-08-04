import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [ConfigService]
})
export class SharedModule {
    static forRoot(config: any): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                { provide: 'config', useValue: config }
            ],
        };
    }
}
