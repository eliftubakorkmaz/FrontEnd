using BookStoreServer.WebApi.ValueObjects;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreServer.WebApi.Models;

public sealed class Order
{
  public int Id { get; set; }
  public string OrderNumber { get; set; }

  [ForeignKey("Book")]
  public int BookId { get; set; }
  public Book Books { get; set; }
  public Money Price { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime PaymentDate { get; set;}
  public string PaymentType { get; set; }
  public string PaymentNumber { get; set; }

  public static string GetNewOrderNumber()
  {
    return Guid.NewGuid().ToString();
  }
}

