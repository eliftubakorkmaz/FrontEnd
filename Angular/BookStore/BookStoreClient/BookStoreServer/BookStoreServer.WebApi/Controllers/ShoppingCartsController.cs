using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using BookStoreServer.WebApi.ValueObjects;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class ShoppingCartsController : ControllerBase
{
  [HttpPost]
  public IActionResult Payment(PaymentDto requestDto)
  {
    decimal total = 0;
    decimal commission = 0;
    foreach (var book in requestDto.books)
    {
      total += book.Price.Value;
    }

    commission = total * 1.2m / 100;

    Currency currency = Currency.TRY;
    string requestCurrency = requestDto.books[0]?.Price?.Currency;
    if(!string.IsNullOrEmpty(requestCurrency)) {
      switch (requestCurrency)
      {
        case "₺":
          currency = Currency.TRY;
          break;
        case "£":
          currency = Currency.GBP;
          break;
        case "$":
          currency = Currency.USD;
          break;
        default:
          throw new Exception("Para birimi bulunamadı!");
          break;
      }
    } else
    {
      throw new Exception("Sepette ürününüz yok!");
    }

    Options options = new Options();
    options.ApiKey = "sandbox-d03dFGzGIkvhLhchJTBfw0ctBvNjiUI0";
    options.SecretKey = "sandbox-WfHUBZgIoiaIJlibPIfheHIgrekToURm";
    options.BaseUrl = "https://sandbox-api.iyzipay.com";

    CreatePaymentRequest request = new CreatePaymentRequest();
    request.Locale = Locale.TR.ToString();
    request.ConversationId = Guid.NewGuid().ToString();
    request.Price = total.ToString();
    request.PaidPrice = commission.ToString();
    request.Currency = currency.ToString();
    request.Installment = 1;
    request.BasketId = Order.GetNewOrderNumber();
    request.PaymentChannel = PaymentChannel.WEB.ToString();
    request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

    PaymentCard paymentCard = requestDto.PaymentCard;
    request.PaymentCard = paymentCard;

    Buyer buyer = requestDto.Buyer;
    buyer.Id = Guid.NewGuid().ToString();
    request.Buyer = buyer;

    request.ShippingAddress = requestDto.ShippingAddress;
    request.BillingAddress = requestDto.BillingAddress;

    List<BasketItem> basketItems = new List<BasketItem>();
    foreach (var book in requestDto.books)
    {
      BasketItem item = new BasketItem();
      item.Id = book.Title;
      item.Category1 = "";
      item.Category2 = "";
      item.ItemType = BasketItemType.PHYSICAL.ToString();
      item.Price = book.Price.Value.ToString();
      basketItems.Add(item);
    }
    request.BasketItems = basketItems;

    Payment payment = Iyzipay.Model.Payment.Create(request, options);

    if(payment.Status == "success")
    {
      List<Order> orders = new();
      foreach (var book in requestDto.books)
      {
        Order order = new()
        {
          OrderNumber = request.BasketId,
          BookId = book.Id,
          Price = new Money(book.Price.Value, book.Price.Currency),
          PaymentDate = DateTime.Now,
          PaymentType = request.PaymentGroup,
          PaymentNumber = payment.PaymentId,
        };
        orders.Add(order);
      }
      AppDbContext context = new();
      context.Orders.AddRange(orders);
      context.SaveChanges();

      return NoContent();
    }
    else
    {
      return BadRequest(payment.ErrorMessage);
    }

    return NoContent();
  }
}
