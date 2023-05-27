import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GeoidComponent} from './component/geoid/geoid.component';
import {GeoidFormComponent} from './feature/geoid-form/geoid-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {WaypointFormComponent} from './feature/waypoint-form/waypoint-form.component';
import {GeoidResultComponent} from './feature/geoid-result/geoid-result.component';
import {MapComponent} from './feature/map/map.component';
import {ScalelineComponent} from './feature/scaleline/scaleline.component';
import {MousePositionComponent} from './feature/mouse-position/mouse-position.component';
import {DecimalPipe} from "@angular/common";
import {AppRoutingModule} from "./module/app-routing/app-routing.module";
import {NavigationBarComponent} from './feature/navigation-bar/navigation-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbRippleModule} from 'mdb-angular-ui-kit/ripple';
import {MdbScrollspyModule} from 'mdb-angular-ui-kit/scrollspy';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbTooltipModule} from 'mdb-angular-ui-kit/tooltip';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {SlovakComponent} from './component/slovak/slovak.component';
import {WaypointListFormComponent} from './feature/slovak-waypoint-list-form/waypoint-list-form.component';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {SlovakStepperComponent} from './feature/slovak-stepper/slovak-stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatTableModule} from "@angular/material/table";
import {MessagesModule} from "primeng/messages";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MessageService} from "primeng/api";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {SelectorFormComponent} from './feature/selector-form/selector-form.component';
import {CdkStepper} from "@angular/cdk/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MutatorFormComponent} from './feature/mutator-form/mutator-form.component';
import {CrossoverFormComponent} from './feature/crossover-form/crossover-form.component';
import {ConfigFormComponent} from './feature/config-form/config-form.component';
import {TerminationFormComponent} from './feature/termination-form/termination-form.component';
import {WebSocketConnector} from "./shared/service/web-socket-connector.service";
import {TspResultPreviewComponent} from './feature/tsp-result-preview/tsp-result-preview.component';
import {MatDialogModule} from "@angular/material/dialog";
import { TspFinalResultComponent } from './feature/tsp-final-result/tsp-final-result.component';
import { InfoBoxComponent } from './feature/info-box/info-box.component';

@NgModule({
  declarations: [
    AppComponent,
    GeoidComponent,
    GeoidFormComponent,
    WaypointFormComponent,
    GeoidResultComponent,
    MapComponent,
    ScalelineComponent,
    MousePositionComponent,
    NavigationBarComponent,
    SlovakComponent,
    WaypointListFormComponent,
    SlovakStepperComponent,
    SelectorFormComponent,
    MutatorFormComponent,
    CrossoverFormComponent,
    ConfigFormComponent,
    TerminationFormComponent,
    TspResultPreviewComponent,
    TspFinalResultComponent,
    InfoBoxComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule,
        MatDialogModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MdbAccordionModule,
        MdbCarouselModule,
        MdbCheckboxModule,
        MdbCollapseModule,
        MdbDropdownModule,
        MdbFormsModule,
        MdbModalModule,
        MdbPopoverModule,
        MdbRadioModule,
        MdbRangeModule,
        MdbRippleModule,
        MdbScrollspyModule,
        MdbTabsModule,
        MdbTooltipModule,
        MdbValidationModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatStepperModule,
        MatTableModule,
        MessagesModule,
        ProgressSpinnerModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSelectModule,
        MatCheckboxModule,
    ],
  providers: [DecimalPipe, MessageService, CdkStepper,
    {
      provide: APP_INITIALIZER,
      deps: [WebSocketConnector],
      useFactory: (wsConnector: WebSocketConnector) => {
        return () => wsConnector.connect("http://localhost:8080/ws");
      },
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
