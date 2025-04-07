namespace Expenses.API.Dtos
{
    public class PutTransactionDto
    {
        public string Type { get; set; }
        public double Amount { get; set; }
        public string Category { get; set; }
    }
}
