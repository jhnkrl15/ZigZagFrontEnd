import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id).subscribe(data => {
      this.book = data;
    });
  }
}
