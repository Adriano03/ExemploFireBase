import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from './models/produto.model';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  produtos: Produto[] = [];

  formulario = new FormGroup({
    descricao: new FormControl(null),
  });

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  async adicionar() {

    const novoProduto = this.formulario.value as Produto;

    await this.firestore.collection('produtos').add(novoProduto);

    this.atualizarLista();
  }

  async deletar(produto: Produto){

    await this.firestore.collection('produtos').doc(produto.id).delete();

    this.atualizarLista();
  }

  async editar(produto: Produto){

    produto.descricao = "editado" + new Date();
    await this.firestore.collection('produtos').doc(produto.id).update(produto);

    this.atualizarLista();
  }

  atualizarLista() {

    this.firestore.collection<Produto>('produtos',
     ref => ref.orderBy('descricao')
     ).get()
      .toPromise()
      .then(documentoData => {

        this.produtos = documentoData.docs.map(doc => {

          const dados = doc.data();

          return {
            id: doc.id,
            ...doc.data()
          } as Produto;

        });

      })
      .catch(erro => {
        console.log('ERRO');
        console.log(erro);
      });
  }

}
