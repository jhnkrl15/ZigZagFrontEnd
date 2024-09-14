import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  createBook(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
