using Expenses.API.Data;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var allTransactions = context.Transactions.ToList();
            return Ok(allTransactions);
        }

        [HttpPost]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto payload)
        {
            var newTransaction = new Transaction()
            {
                Amount = payload.Amount,
                Type = payload.Type,
                Category = payload.Category,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Transactions.Add(newTransaction);
            context.SaveChanges();

            return Ok();
        }
    }
}
