import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(this.bookId).subscribe(book => {
      this.bookForm.patchValue(book);
    });
  }

  updateBook(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = { id: this.bookId, ...this.bookForm.value };
      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
