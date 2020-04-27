import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ExemploFirebase';

  constructor(private firestore: AngularFirestore){ }

  ngOnInit(): void {

    this.firestore.collection('produtos').get()
      .toPromise()
      .then(x => {
        console.log('certo');
        console.log(x);
      })
      .catch(erro => {
        console.log(erro);
      });

  }

}
