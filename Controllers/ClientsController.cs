using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Controllers
{
    [Authorize]
    [Route("api/clients")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientsRepository clientsRepository;

        public ClientsController(IClientsRepository clientsRepository)
        {
            this.clientsRepository = clientsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await clientsRepository.GetClients();

            return Ok(clients);
        }

        [HttpGet("clientmodules/{id}")]
        public async Task<IActionResult> GetClientModules(int id)
        {
            var clientModules = await clientsRepository.GetClientModules(id);

            return Ok(clientModules);
        }
    }
}
