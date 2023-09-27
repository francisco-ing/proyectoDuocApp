import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private menu: MenuController) {
  }

  fecha: Date = new Date();
  dia: number = this.fecha.getDate(); 
  mes: number = this.fecha.getMonth() + 1; 
  annio: number = this.fecha.getFullYear(); 
  usuario = localStorage.getItem('nombreUsuario');

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu.enable(true);
  }

}
