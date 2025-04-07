using Expenses.API.Data;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class AuthController(AppDbContext context) : ControllerBase
    {
        [HttpPost("Register")]
        public IActionResult Register([FromBody]PostUserDto payload)
        {
            if (context.Users.Any(n => n.Email == payload.Email))
                return BadRequest("This email address is already taken");

            var newUser = new User()
            {
                Email = payload.Email,
                Password = payload.Password, //hash it
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            context.Users.Add(newUser);
            context.SaveChanges();

            var token = GenerateJwtToken(newUser);

            return Ok(new {Token = token});
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-very-secure-secret-key-32-chars-long"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "dotnethow.net",
                audience: "dotnethow.net",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
