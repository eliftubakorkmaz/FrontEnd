namespace BookStoreServer.WebApi.Models;

public sealed class Category
{
  public int Id { get; set; }
  public string Name { get; set; }
  public bool IsActive { get; set; }
  public bool IsDeleted { get; set; }
}
