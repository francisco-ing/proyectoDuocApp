import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, private router: Router, private loadingCtrl: LoadingController, private navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;

    var nombreUsuario = localStorage.getItem('nombreUsuario');
    var contrasenaUsuario = localStorage.getItem('contrasenaUsuario');

    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Atencion!.',
        message: 'Debes ingresar todos los datos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    } else if (nombreUsuario == f.nombre && contrasenaUsuario == f.contrasena) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
        duration: 1000,
      });
      this.formularioLogin.reset(); 
      localStorage.setItem('autenticado','true');
      loading.present();
      loading.onDidDismiss().then(() => {
        // Redirigir a otra página aquí
        this.router.navigate(['/folder/:id']);
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Atencion!.',
        message: 'Datos incorrectos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }
  }
}