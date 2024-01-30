using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class ConfigurationsController : ControllerBase
{
  private readonly AppDbContext context = new();

  [HttpGet]
  public IActionResult SeedData()
  {
    List<Book> books = new();
    for (int i = 0; i < 100; i++)
    {
      var book = new Book()
      {
        Title = $"Book {i}",
        Author = $"Author {i}",
        Summary = $"Summary {i}",
        CoverImageUrl = $"https://m.media-amazon.com/images/I/41CFVIhlBFL._AC_UL960_QL65_.jpg",
        Price = new(i * 2, "₺"),
        IsActive = true,
        IsDeleted = false,
        ISBN = $"ISBN {i}",
        CreateAt = DateTime.Now,
      };
      books.Add(book);
    }
    context.Books.AddRange(books);
    context.SaveChanges();

    List<Category> categories = context.Categories.ToList();

    List<BookCategory> bookCategories = new();
    foreach (var book in books)
    {
      var bookCategory = new BookCategory()
      {
        BookId = book.Id,
        CategoryId = categories[new Random().Next(0, categories.Count)].Id
      };
      bookCategories.Add(bookCategory);
    }

    context.BookCategories.AddRange(bookCategories);

    context.SaveChanges();

    return NoContent();
  }
}
