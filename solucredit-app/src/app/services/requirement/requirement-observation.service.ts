import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { GetRequirementObservations, RequirementObservation } from 'src/app/models/requirementObservation.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RequirementObservationService {

  constructor(private http: HttpClient) { }

  save(data: any) {
    const uri = `${environment.urlRequirementObservation}`
    return this.http.post(uri, data, HTTPOPTIONS)
  }
  list(request_id: number, rwedet_id: number) {
    const uri = `${environment.urlRequirementObservation}/${request_id}/${rwedet_id}`
    return this.http.get<GetRequirementObservations>(uri, HTTPOPTIONS).pipe(
      map((res) => {
        return res.body.data
      })
    )
  }
}

