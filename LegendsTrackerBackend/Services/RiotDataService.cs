using Camille.Core;
using Camille.Enums;
using Camille.RiotGames;

namespace LegendsTrackerBackend.Services
{
    public class RiotDataService : IRiotDataService
    {
        private readonly ILogger<RiotDataService> logger;
        public RiotDataService(IConfiguration configuration, ILogger<RiotDataService> logger)
        {
            Configuration = configuration;
            this.logger = logger;
        }
        private IConfiguration Configuration { get; }

        public void GetApiData()
        {
            Console.WriteLine("GetApiData() Started...");
        }
    }
}
