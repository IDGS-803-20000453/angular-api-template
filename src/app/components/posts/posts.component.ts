import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,
     FormsModule,
     MatTableModule,
     MatPaginatorModule,
     MatFormFieldModule,
     MatInputModule,
     RouterModule,
     MatButtonModule,
      MatIconModule,
      MatDialogModule
    ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'id', 'title', 'body', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchPosts();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '400px',
      data: { action: 'Agregar' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.createItem(result).subscribe(() => {
          this.fetchPosts();
        });
      }
    });
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '400px',
      data: { action: 'Editar', post: element },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.updateItem(element.id, result).subscribe(() => {
          this.fetchPosts();
        });
      }
    });
  }
  
  deleteItem(id: number): void {
    this.apiService.deleteItem(id).subscribe(() => {
      this.fetchPosts();
    });
  }
  


  fetchPosts() {
    this.apiService.getItems().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changePage(pageIndex: number) {
    this.paginator.pageIndex = pageIndex - 1;
  }
}