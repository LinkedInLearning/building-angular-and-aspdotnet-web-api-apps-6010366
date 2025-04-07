using Expenses.API.Models.Base;

namespace Expenses.API.Models
{
    public class Transaction:BaseEntity
    {
        public string Type { get; set; }
        public double Amount { get; set; }
        public string Category { get; set; }

        public int? UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
