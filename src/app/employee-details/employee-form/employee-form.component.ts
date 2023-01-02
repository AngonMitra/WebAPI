import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService:EmployeeService) { }

  ngOnInit(): void {

    this.empService.getDesignation().subscribe(data=>{
    this.empService.listDeg=data;
    });
  }

  submit(form:NgForm)
  {
        
        this.empService.empData.isMarried=form.value.isMarried==true?1:0;
        this.empService.empData.isActive=form.value.isActive==true?1:0;

        if(this.empService.empData.id==0)
           this.insertEmployee(form);
        else
           this.updateEmployee(form);
  }

  insertEmployee(myform:NgForm)
  {
     this.empService.saveEmployee().subscribe(d=>{
      this.resetForm(myform);
       this.refreshData();
       console.log('Data Saved Successfully');
     });
  }

  updateEmployee(myform:NgForm)
  {
    this.empService.updateEmployee().subscribe(d=>{
      this.resetForm(myform);
       this.refreshData();
       console.log('Data Updated Successfully');
     });
  }

  resetForm(myform:NgForm)
  {
    myform.form.reset();
    this.empService.empData= new Employee();
  }

  refreshData()
  {
    this.empService.getEmployee().subscribe(res=>{
      this.empService.listEmp=res;

    });
  }
}
