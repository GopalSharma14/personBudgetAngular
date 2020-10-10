// import { Injectable, NgModule } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// // import { catchError, map, tap } from 'rxjs/operators';
// // import { stringify } from 'querystring';

// // export interface Item{
// //   label: string;
// //   value: number;
// //   abs: number;
// // }


// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

// //   private myData = [];
// //   private theTitle = [];
// //   private theBudget = [];
// //   private currentKey;
// //   private currentVal;
// //   private result = []

// //   public  dataSource = {
// //     datasets: [{
// //         data: [],
// //         backgroundColor: [
// //             '#ffcd56',
// //             '#ff6384',
// //             '#36a2eb',
// //             '#fd6b19',
// //             '#23CFCF',
// //             '#F82D0D',
// //             '#2F895E'
// //         ]
// //     }],

// //     labels: []
// // };

// //   constructor(private http: HttpClient) {

// //     this.http.get('http://localhost:3000/budget')
// //     .subscribe((res: any) => {
// //       for (var i = 0; i < res.myBudget.length; i++) {
// //         this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
// //         this.dataSource.labels[i] = res.myBudget[i].title;
// //         // this.myData[res.myBudget[i].title] = res.myBudget[i].budget
// //         // this.myTitle.push(res.myBudget[i].title)

// //     }

// //     console.log(this.dataSource)
// //     this.theTitle= this.dataSource.labels
// //     this.theBudget=this.dataSource.datasets[0].data
// //     console.log(this.theTitle);
// //     console.log(this.theBudget);

// //     for (i = 0; i < this.theBudget.length; i++) {
// //       this.currentKey = this.theTitle[i];
// //       this.currentVal = this.theBudget[i];
// //         this.result[this.currentKey] = this.currentVal;

// //   }
// //     console.log(this.result)

// //     console.log(this.dataSource.datasets)
// //     console.log(this.dataSource.labels)


// //     });

// //     console.log(this.result)





//   }

// // constructor(private http: HttpClient) { }

// // getData(): Item[] {
// //   const url = 'http://localhost:3000/budget';
// //   const samples = [];

// //   this.http.get(url).pipe().subscribe((res) => {
// //     const res2 = JSON.stringify(res);
// //     const object = JSON.parse(res2);
// //     const array = Object.keys(object).map(function(k) {
// //         return object[k];
// //       });
// //     for(var i = 0; i < array[0].length; i++){
// //       samples.push({
// //       name : array[0][i].title,
// //       value : array[0][i].budget,
// //       abs: Math.abs(array[0][i].budget)
// //       });
// //     }
// //   });
// //   return samples;
// // }
// private dataPath = 'http://localhost:3000/budget';
//   constructor(private http: HttpClient) {}
//   //7. Also, make sure that the method that makes the call to the backend service will only be executed if the variable inside the DataService is empty. If the variable inside the DataService is full, then there is no need to make a new call to the backend
//   getData(): Observable<any> {
//     return this.http.get(this.dataPath);
//   }




// }

import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// 6.Create a new Angular Service called "data", and make sure that
// The Http call to the backend will populate a variable inside the DataService
// And that the Charts that you have implemented are reading the data from the DataService and not from a local variable
export class DataService {
  private dataPath = 'http://localhost:3000/budget';
  constructor(private http: HttpClient) {}
  //7. Also, make sure that the method that makes the call to the backend service will only be executed if the variable inside the DataService is empty. If the variable inside the DataService is full, then there is no need to make a new call to the backend
  getData(): Observable<any> {
    return this.http.get(this.dataPath);
  }
}
