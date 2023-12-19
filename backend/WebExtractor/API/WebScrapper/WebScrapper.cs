using Microsoft.AspNetCore.Mvc;

namespace WebExtractor.Api.WebScrapper
{
    [Route("[controller]")]
    [ApiController]
    public class WebScrapper : ControllerBase
    {


        [HttpGet]
        public IActionResult Get() => Ok("Hello World");
    }

}
