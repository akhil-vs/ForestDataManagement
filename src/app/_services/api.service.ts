import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getPrevMonth(cMonth: number, cYear: number, division: string, circle: string, hoa: string) {
    return this.http.get(`${environment.apiUrl}/form/prevmonth?month=${cMonth}&year=${cYear}&divison=${division}&circle=${circle}&hoa=${hoa}`);
  }

  getCurrentMonth(cMonth: number, cYear: number, division: string, circle: string, hoa: string) {
    return this.http.get(`${environment.apiUrl}/form/currentmonth?month=${cMonth}&year=${cYear}&divison=${division}&circle=${circle}&hoa=${hoa}`);
  }

  submitForm(userId: number, month: number, year: number, circle: string, division: string, hoa: string, data: any) {
    return this.http.post(`${environment.apiUrl}/form/submit`, {
      userId: userId,
      month: month,
      year: year,
      circle: circle,
      division: division,
      hoa: hoa,
      data: data
    })
  }

}
