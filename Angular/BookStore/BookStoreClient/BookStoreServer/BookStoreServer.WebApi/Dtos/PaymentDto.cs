using BookStoreServer.WebApi.Models;
using Iyzipay.Model;

namespace BookStoreServer.WebApi.Dtos;

public sealed record PaymentDto(
  List<Book> books,
  PaymentCard PaymentCard,
  Buyer Buyer,
  Address ShippingAddress,
  Address BillingAddress);
