using Microsoft.EntityFrameworkCore;

namespace Api.Pagination;

public static class PaginateExtension
{
    public static async Task<PaginatedData<T>> Paginate<T>(
        this IQueryable<T> queryable,
        CancellationToken ct,
        int page = 1,
        int itemsPerPage = 30) where T : class
    {
        page -= 1;
        if (page < 0) page = 0;
        var items = await queryable.Skip(page * itemsPerPage).Take(itemsPerPage).ToListAsync(ct);
        var count = await queryable.CountAsync(ct);
        return new PaginatedData<T>
        {
            Data = items,
            Total = count,
            CurrentPage = page + 1,
            PerPage = itemsPerPage
        };
    }
}
