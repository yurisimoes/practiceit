namespace Api;

public static class Utils
{
    public static int? ToInt(this string? value)
    {
        if (int.TryParse(value, out int result))
        {
            return result;
        }

        return null;
    }
}