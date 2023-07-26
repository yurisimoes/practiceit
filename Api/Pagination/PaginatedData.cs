namespace Api.Pagination;

public class PaginatedData<T>
{
    public int PerPage { get; set; }
    public int CurrentPage { get; set; }
    public int Total { get; set; }
    public ICollection<T> Data { get; set; } = new List<T>();
}
