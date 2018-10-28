import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InstallPwaButtonComponent } from './install-pwa-button.component';

@NgModule({
    declarations: [
        InstallPwaButtonComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        InstallPwaButtonComponent
    ]
})
export class InstallPwaButtonComponentModule {}
