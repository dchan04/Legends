using LegendsTrackerBackend;
using LegendsTrackerBackend.Processes;

namespace LegendsTrackerBackend.Worker
{
    public class RiotApiWorker : BackgroundService
    {
        private readonly IRiotDataProcess riotDataProcess;
        public RiotApiWorker(IRiotDataProcess riotDataProcess)
        {
            this.riotDataProcess = riotDataProcess;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await riotDataProcess.GetApiData();
            }
            throw new NotImplementedException();
        }
    }
}
