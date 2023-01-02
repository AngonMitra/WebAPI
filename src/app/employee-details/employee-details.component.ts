import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeeService, public datepipe:DatePipe) { }

  ngOnInit(): void {

    this.empService.getEmployee().subscribe(data=>{
    this.empService.listEmp=data;
   });
  }

  editEmployee(selectedEmployee:Employee)
  {
    console.log(selectedEmployee);

    let df=this.datepipe.transform(selectedEmployee.doj, 'yyyy-MM-dd');
    selectedEmployee.doj=df;
      this.empService.empData=selectedEmployee;
  }

  deleteEmployee(id:number)
  {
    if(confirm('Do you want to delete this record'))
    {
      this.empService.deleteEmployee(id).subscribe(data=>{
        console.log('Record Deleted Successfully');

        this.empService.getEmployee().subscribe(data=>{
          this.empService.listEmp=data;
         });

      },
      err=>{
        console.log('Record not Deleted');
      });
    }
  }

}
