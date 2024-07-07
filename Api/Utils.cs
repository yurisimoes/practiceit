namespace Api;

public static class Utils
{
    public static int ToInt(this string? value)
    { 
        return int.Parse(value);
    }
}
