import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  empform: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intrtmediate',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private dialogref: MatDialogRef<AddEditEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.empform = this.fb.group({
      fristname: '',
      lastname: '',
      email: '',
      dob: '',
      gander: '',
      education: '',
      company: '',
      exp: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empform.patchValue(this.data);
  }
  onformSubmit() {
    if (this.empform.valid) {
      if (this.data) {
        this.service.updateEmployee(this.data.id,this.empform.value).subscribe({
          next : (val: any) => {
            alert('Employee Detail Updated succesfull');
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      } else {
        this.service.addEmployee(this.empform.value).subscribe({
          next : (val: any) => {
            alert('Employee Added succesfull ');
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }

    }
  }
}
