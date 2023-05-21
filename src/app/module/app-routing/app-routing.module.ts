import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GeoidComponent} from "../../component/geoid/geoid.component";
import {SlovakComponent} from "../../component/slovak/slovak.component";
import {InfoBoxComponent} from "../../feature/info-box/info-box.component";

const routes: Routes = [
  {
    path: '',
    component: SlovakComponent
  },
  {
    path: 'info',
    component: InfoBoxComponent
  },
  {
    path: 'geoid',
    component: GeoidComponent
  },
  {
    path: 'slovak',
    component: SlovakComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
