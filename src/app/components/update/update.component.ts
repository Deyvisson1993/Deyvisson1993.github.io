import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {

    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //Metodo para chamar os atributos nda url com o id de identificação
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void{
    this.service.findById(this.todo.id).subscribe((resposta) =>{
      this.todo = resposta;
    })
  }

  update(): void{
    this.service.update(this.todo).subscribe((resposta) =>{
      this.service.message('Informoções Atualizadas com Sucesso!');
      this.router.navigate(['']);
    }, error => {
      this.service.message('Erro ao atualizar');
      this.router.navigate(['']);
    })
  }

  cancel(): void{
    this.router.navigate(['']);
  }

  formatarData(): void{
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
}
