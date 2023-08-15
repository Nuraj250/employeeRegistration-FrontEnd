import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import alertJson from 'src/assets/alert.json';
import { AlertService } from 'ngx-alerts';
import { Alert } from 'src/assets/alert';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({

  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  alertJson: Alert = alertJson;
  employeeDetails: any;
  allEmployee: any;
  employeeForm = new FormGroup({});

  constructor( private employeeService: EmployeeService, private alertService: AlertService) { }

   ngOnInit(){
    this.employeeForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      sname: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      mname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      mobile: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      designation: new FormControl('',[Validators.required]),
      reportingManager: new FormControl('',[Validators.required]),
      companyEmail: new FormControl('',[Validators.required]),
      idNumber: new FormControl('',[Validators.required]),
      DOA: new FormControl('',[Validators.required]),
      accnum: new FormControl('',[Validators.required]),
      bank: new FormControl('',[Validators.required]),
      branch: new FormControl('',[Validators.required]),
      BOD: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      note: new FormControl('',[Validators.required])
    });
     this.loadAllEmployees();
  }

  public cancel(){
    this.employeeForm.reset();
  }


  public updateEmployee(){
    return new Promise(resolve => {
      const employeeValue=this.employeeForm.value
      this.employeeService.updateEmployee(employeeValue).subscribe((res: any) => {

        if (res.message === 'Update Successful!') {
          this.alertService.success(res.message);
          this.allEmployee[this.employeeDetails.index] = (res.object);
          resolve(true);
        } else {
          this.alertService.danger(res.message);
          resolve(false);
        }
      }, (error: any) => {
        this.alertService.danger(this.alertJson.backendError);
        resolve(false);
      });
    });
  }

  public saveEmployee() {
    return new Promise(resolve => {

      const employee = this.employeeForm.value;
      this.employeeService.saveEmployee(employee).subscribe((res: any) => {

        if (res.message === 'Successfully saved!') {
          this.allEmployee.push(res.object);
          this.alertService.success(res.message);
          resolve(true);
        } else {
          this.alertService.warning(res.message);
          resolve(false);
        }

      }, (error: any) => {

        this.alertService.danger(this.alertJson.backendError);
        resolve(false);
      });
    });
  }
  private loadAllEmployees() {
    return new Promise(async resolve => {
      this.employeeService.getEmployees().subscribe((res: any) => {

        this.allEmployee = res.object;
        resolve(true);
    })})
  }

  public remove(data: Employee, i: number) {
    this.employeeService.deleteEmployee(data?.id).subscribe((res: any) => {
      if (res.message === 'Removed Successful!') {

        this.allEmployee.splice(i, 1);
        this.alertService.success(res.message);
      } else {
        this.alertService.warning(res.message);
      }
    }, (error: any) => {
      this.alertService.danger(this.alertJson.backendError);
    });
  }

  public edit(data: Employee, i: number,element: HTMLElement): Promise<boolean> {
    return new Promise(async resolve => {

      this.employeeDetails = { obj: data, index: i };

      this.employeeForm.patchValue(data);

      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    });
  }
}
