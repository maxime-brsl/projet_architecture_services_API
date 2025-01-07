import { Injectable } from '@angular/core';
import {delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  getOdds(matchId: number) {
    return of({ home: '1.5', draw: '2.7', away: '3.1' }).pipe(delay(1000));
  }
}
