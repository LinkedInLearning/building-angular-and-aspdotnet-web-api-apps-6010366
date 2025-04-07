using Expenses.API.Data;
using Expenses.API.Data.Services;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class TransactionsController(ITransactionsService transactionService) : ControllerBase
    {
        [HttpGet("All")]
        public IActionResult GetAll()
        {
            var allTransactions = transactionService.GetAll();
            return Ok(allTransactions);
        }

        [HttpGet("Details/{id}")]
        public IActionResult Get(int id)
        {
            var transactionDb = transactionService.GetById(id);
            if (transactionDb == null)
                return NotFound();

            return Ok(transactionDb);
        }

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto payload)
        {
            var newTrasaction = transactionService.Add(payload);
            return Ok(newTrasaction);
        }

        [HttpPut("Update/{id}")]
        public IActionResult UpdateTransaction(int id, [FromBody]PutTransactionDto payload)
        {
            var updatedTransaction = transactionService.Update(id, payload);
            if (updatedTransaction == null)
                return NotFound();

            return Ok(updatedTransaction);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            transactionService.Delete(id);
            return Ok();
        }
    }
}
