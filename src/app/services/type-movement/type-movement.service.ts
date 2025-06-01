import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Observable } from 'rxjs';
import { TypeMovement } from 'src/app/models/type-movement/type-movement.model';

@Injectable({
  providedIn: 'root',
})
export class TypeMovementService extends BaseHttpService {
  public getTypeMovements(): Observable<TypeMovement[]> {
    return this.http.get<TypeMovement[]>(`${this.apiUrl}/tipos-movimiento`);
  }
}
