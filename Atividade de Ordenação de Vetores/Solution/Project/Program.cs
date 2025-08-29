using System;
class Program
{
    static void Main()
    {
        Random random = new Random();
        int[] array = new int[1000];
        for (int i = 0; i < array.Length; i++)
        {
            array[i] = random.Next(1, 1001);
        }
        Console.WriteLine(" ");
        Console.WriteLine("Valores antes da ordenação: ");
        foreach (var item in array)
        {
            Console.Write(item + " ");
        }
        Array.Sort(array);
        Console.WriteLine(" ");
        Console.WriteLine(" ");
        Console.WriteLine("Valores depois da ordenação: ");
        foreach (var item in array)
        {
            Console.Write(item + " ");
        }
    }
}