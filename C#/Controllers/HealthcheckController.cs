using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace paymentGatewaySimulation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthcheckController : ControllerBase
    {
        private readonly ILogger<HealthcheckController> _logger;

        public HealthcheckController(ILogger<HealthcheckController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Mock server responded to health check");
        }
    }
}
