import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CarModel } from 'src/app/models/carModels.interface';
import { City, CityResponse, Department, DepartmentResponse } from 'src/app/models/locations.interface';
import { QuotationResponse } from 'src/app/models/quotation.interface';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { QuotationService } from 'src/app/services/quotation/quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit, OnDestroy {

  // Controlar subscripciones y se debe inicializar
  private subscription: Subscription = new Subscription();

  // Formulario
  quotationForm: FormGroup;

  showLoadingModels = false;
  showLoadingDepartments = false;
  showLoadingCities = false;
  loadingSubmitted = false;

  carModels: CarModel[] = [];
  // Array departamento
  departments: Department[] = [];
  // Departamentos a friltar
  filteredDepartments = new Observable<Department[]>();
  // Departamento seleccionado
  departmentSelect: Department;

  // Array ciudades
  cities: City[] = [];

  private isValidEmail = /\S+@\S+\.\S+/;
  numberRegEx = /\-?\d*\.?\d{1,2}/;


  constructor(private fb: FormBuilder,
    private quotationService: QuotationService,
    private locationService: LocationsService) {

    this.departmentSelect = {
      'department_id': 1,
      'name': 'test'
    };

    // Obtener valores del formulario del predio y validaciones
    this.quotationForm = this.fb.group({
      car_model: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cellphone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numberRegEx)]],
      data_policy: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.onGetCarModels();
    this.onGetDepartments();

    this.quotationForm.get('department_id')?.valueChanges.subscribe(
      dep => {
        this.onGetCities(dep);
      }
    )
  }

  // Destrucción de componente.
  // Terminar subcripción para evitar consumo de memoria.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Obtener cargar modelos de carros
  onGetCarModels(): void {
    this.showLoadingModels = true;

    this.subscription.add(
      // Obtener petición realizada por el servicio
      this.quotationService
        .getcarModels()
        .subscribe((res: any[]) => {
          if (res) {         
              this.carModels = res[1].subitems;
              this.showLoadingModels = false;
            
          } else {
            
            this.showLoadingModels = false;
          }
        }, (error) => {
          console.log(error);
          this.showLoadingModels = false;
        })
    );
  }

  // Obtener ciudades en el combo
  onGetDepartments(): void {
    this.showLoadingDepartments = true;

    this.subscription.add(
      // Obtener petición realizada por el servicio
      this.locationService
        .getDepartments()
        .subscribe((res: DepartmentResponse) => {
          if (res) {
            if (res.status == 'success') {
              this.departments = res.departments;
            } 
          } else {
            
            this.showLoadingDepartments = false;
          }
        }, (error) => {
          console.log(error);
          this.showLoadingDepartments = false;
        })
    );
  }

  // Obtener ciudades por departamento
  onGetCities(departmentId: number): void {
    this.showLoadingCities = true;

    this.subscription.add(
      // Obtener petición realizada por el servicio
      this.locationService
        .getCities(departmentId)
        .subscribe((res: CityResponse) => {
          if (res) {
            if (res.status == 'success') {
              this.cities = res.cities;
              this.showLoadingCities = false;
            } 
          } else {
            
            this.showLoadingCities = false;
          }
        }, (error) => {
          console.log(error);
          this.showLoadingCities = false;
        })
    );
  }

  // Guardar cotizacion
  onSaveQuotation() {
    this.loadingSubmitted = true;
    // Validar datos correctos
    if (this.quotationForm.valid) {

      this.subscription.add(
        // Obtener petición realizada por el servicio
        this.quotationService
          .saveQuotation(this.quotationForm.value)
          .subscribe((res: QuotationResponse) => {
            if (res) {
              if (res.status == 'success') {
                // Mostrar notificación
                this.loadingSubmitted = false;
                this.quotationForm.reset();
              } else {
                this.loadingSubmitted = false;
              }
            }
          }, (error) => {
            console.log(error);
            this.loadingSubmitted = false;
          })
      );
    }
  }

  // Obtener control del formulario
  get quotationFormControl() {
    return this.quotationForm.controls;
  }
}
