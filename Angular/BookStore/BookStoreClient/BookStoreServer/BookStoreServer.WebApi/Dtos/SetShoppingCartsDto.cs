namespace BookStoreServer.WebApi.Dtos;

public sealed record SetShoppingCartsDto(
  int BookId,
  int UserId,
  int Quantity,
  money Price,
  string Currency);
