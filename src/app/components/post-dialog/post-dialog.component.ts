import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css'],
})
export class PostDialogComponent {
  postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      userId: [data.post ? data.post.userId : ''],
      title: [data.post ? data.post.title : ''],
      body: [data.post ? data.post.body : ''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.postForm.valid) {
      this.dialogRef.close(this.postForm.value);
    }
  }
}
