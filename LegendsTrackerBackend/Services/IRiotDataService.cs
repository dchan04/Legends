using Camille.RiotGames;
using Camille.RiotGames.TftLeagueV1;

namespace LegendsTrackerBackend.Services
{
    public interface IRiotDataService
    {
        Task GetApiData();
    }
}
