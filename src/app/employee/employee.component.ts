import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import alertJson from 'src/assets/alert.json';
import { AlertService } from 'ngx-alerts';
import { Alert } from 'src/assets/alert';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({

  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  alertJson: Alert = alertJson;
  employeeForm = new FormGroup({
    sname: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    mname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
  });
  employeeDetails: any;
  allEmployee: any;
  constructor(private spinner: NgxSpinnerService,private employeeService: EmployeeService,private alertService: AlertService) { }
  get sname(): any {
    return this.employeeForm.get('sname');
  } get fname(): any {
    return this.employeeForm.get('fname');
  } get mname(): any {
    return this.employeeForm.get('mname');
  } get lname(): any {
    return this.employeeForm.get('lname');
  } get mobile(): any {
    return this.employeeForm.get('mobile');
  } get address(): any {
    return this.employeeForm.get('address');
  } get designation(): any {
    return this.employeeForm.get('designation');
  } get reportingManager(): any {
    return this.employeeForm.get('reportingManager');
  } get companyEmail(): any {
    return this.employeeForm.get('companyEmail');
  } get id(): any {
    return this.employeeForm.get('id');
  } get DOA(): any {
    return this.employeeForm.get('DOA');
  } get accnum(): any {
    return this.employeeForm.get('accnum');
  } get bank(): any {
    return this.employeeForm.get('bank');
  } get branch(): any {
    return this.employeeForm.get('branch');
  } get BOD(): any {
    return this.employeeForm.get('BOD');
  } get gender(): any {
    return this.employeeForm.get('gender');
  } get age(): any {
    return this.employeeForm.get('age');
  } get password(): any {
    return this.employeeForm.get('password');
  } get note(): any {
    return this.employeeForm.get('note');
  }

  async ngOnInit(): Promise<any> {
    await this.spinner.show();
    await this.loadAllEmployees();
    await this.spinner.hide();
  }
  async cancel(savebtn: HTMLButtonElement): Promise<any> {
    this.employeeForm.reset();
    savebtn.innerText = 'Save';
  }
  async save(savebtn: HTMLButtonElement): Promise<any> {
    this.employeeForm.markAllAsTouched();
    if (this.employeeForm.valid) {
      if (savebtn.innerText === 'Save') {
        await this.spinner.show();
        await this.saveEmployee(savebtn);
        await this.spinner.hide();
      } else {
        await this.spinner.show();
        await this.updateEmployee(savebtn);
        await this.spinner.hide();
      }
    } else {
      this.alertService.danger(this.alertJson.formValidateError);
    }
  }
  async updateEmployee(savebtn: HTMLButtonElement): Promise<boolean> {
    return new Promise(resolve => {
      const employee = new Employee(this.sname.value, this.fname.value, this.mname.value, this.lname.value, this.mobile.value, this.address.value, this.designation.value, this.reportingManager.value, this.companyEmail.value, this.DOA.value, this.accnum.value, this.bank.value, this.branch.value, this.BOD.value, this.gender.value, this.age.value, this.password.value, this.note.value);
      this.employeeService.updateEmployee(employee).subscribe((res: any) => {

        if (res.message === 'Update Successful!') {
          this.alertService.success(res.message);
          this.allEmployee[this.employeeDetails.index] = (res.object);
          this.cancel(savebtn);
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
  async saveEmployee(savebtn: HTMLButtonElement): Promise<boolean> {
    return new Promise(resolve => {

      const employee = new Employee(this.sname.value, this.fname.value, this.mname.value, this.lname.value, this.mobile.value, this.address.value, this.designation.value, this.reportingManager.value, this.companyEmail.value, this.DOA.value, this.accnum.value, this.bank.value, this.branch.value, this.BOD.value, this.gender.value, this.age.value, this.password.value, this.note.value);
      this.employeeService.saveEmployee(employee).subscribe((res: any) => {

        if (res.message === 'Successfully saved!') {
          this.allEmployee.push(res.object);
          this.cancel(savebtn);
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
  async loadAllEmployees(): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.employeeService.getEmployees().subscribe((res: any) => {

        this.allEmployee = res.object;
        resolve(true);
      }, error => {
        resolve(false);
      });
    });
  }
  async remove(data: Employee, i: number): Promise<any> {
    this.spinner.show();
    this.employeeService.deleteEmployee(data?.id).subscribe((res: any) => {
      if (res.message === 'Removed Successful!') {

        this.allEmployee.splice(i, 1);
        this.alertService.success(res.message);
        this.spinner.hide();
      } else {
        this.alertService.warning(res.message);
        this.spinner.hide();
      }
    }, (error: any) => {
      this.alertService.danger(this.alertJson.backendError);
      this.spinner.hide();
    });
  }
  async edit(data: Employee, i: number, savebtn: HTMLButtonElement, element: HTMLElement): Promise<boolean> {
    await this.spinner.show();
    return new Promise(async resolve => {
      savebtn.innerText = 'Update';

      this.employeeDetails = { obj: data, index: i };

      this.sname.setValue(data.sName);
      this.fname.setValue(data.fName);
      this.mname.setValue(data.mName);
      this.lname.setValue(data.lName);
      this.mobile.setValue(data.mobile);
      this.address.setValue(data.address);
      this.designation.setValue(data.designation);
      this.reportingManager.setValue(data.reportingManager);
      this.DOA.setValue(data.DOA);
      this.bank.setValue(data.bank);
      this.branch.setValue(data.branch);
      this.BOD.setValue(data.BOD);
      this.gender.setValue(data.gender);
      this.age.setValue(data.age);
      this.password.setValue(data.password);
      this.note.setValue(data.note);
      this.id.setValue(data.id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      await this.spinner.hide();
    });
  }
}
