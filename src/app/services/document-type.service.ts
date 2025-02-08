import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentType } from '../models/document-type';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  private apiUrl = 'http://localhost:8080/api/tipos-documento';
  public http = inject(HttpClient)


  public getDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${this.apiUrl}`)
  }

}
