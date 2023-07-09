namespace Api;

public static class Utils
{
    public static string StrOr(this string str, string otherString)
    {
        return string.IsNullOrWhiteSpace(str) ? otherString : str;
    }
}
