import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Feature} from "ol";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private featureAdded: Subject<Feature> = new Subject<Feature>();

  constructor() {
  }

  public onFeatureAdded(): Observable<Feature> {
    return this.featureAdded.asObservable();
  }

  public addFeature(feature: Feature): void {
    this.featureAdded.next(feature);
  }

}
