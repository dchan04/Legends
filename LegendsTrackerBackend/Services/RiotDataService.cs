
using Camille.Enums;
using Camille.RiotGames;
using Camille.RiotGames.TftLeagueV1;
using LegendsTrackerBackend.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace LegendsTrackerBackend.Services
{
    public class RiotDataService : IRiotDataService
    {
        private readonly ILogger<RiotDataService> logger;
        private IConfiguration Configuration { get; }
        public RiotDataService(IConfiguration configuration, ILogger<RiotDataService> logger)
        {
            Configuration = configuration;
            this.logger = logger;
        }

        public  Task GetApiData()
        {
            Console.WriteLine("GetApiData() function has Started...");
            var riotApi = RiotGamesApi.NewInstance(Configuration.GetConnectionString("ApiKey"));
            var division = "I";
            var entry = riotApi.TftLeagueV1().GetLeagueEntries(PlatformRoute.NA1, Tier.DIAMOND, division);
            List<string> CompanionIDList = new();
            List<int> SkinIDList = new();
            if (entry != null)
            {
                //ParseApiData(entry.ToList(), riotApi, CompanionIDList, SkinIDList);
                //GetAllSpecies(CompanionIDList, SkinIDList);
                //AddDataToDatabase(CompanionIDList, SkinIDList);
            }

            return Task.CompletedTask;
        }

        private static Task AddDataToDatabase(List<String> companionIdList, List<int> speciesIdList) {
            Console.WriteLine("AddDataToDatabase has been called");
            var jsonData = new HttpClient().GetStringAsync("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/companions.json");
            jsonData.Wait();
            JArray Objects = JsonConvert.DeserializeObject<JArray>(jsonData.Result);

            using (var db = new LegendsDBContext()) 
            {
                for (int i = 0; i < companionIdList.Count(); i++)
                {
                    string contentId = companionIdList[i];

                    var legendObj = Objects.Where(y => y["contentId"].ToString().Equals(contentId)).SingleOrDefault();
                    string loadoutsIcon = (string)legendObj["loadoutsIcon"];
                    string[] splitPath = loadoutsIcon.Split("/");
                    string pngName = splitPath[^1].ToLower();
                    string path = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/" + pngName;
                    Species species = db.species.Include(s=> s.Variants).FirstOrDefault(s => s.speciesCode == (int)legendObj["speciesId"]);
                    if (species == null)
                    {
                        Console.WriteLine("Test");
                    }
                    else
                    {
                        Variant variant = new Variant();
                        variant.VariantCode = (int)legendObj["itemId"];
                        variant.level = (int)legendObj["level"];
                        variant.rarity = (string)legendObj["rarity"];
                        variant.name = (string)legendObj["name"];
                        variant.imgPath = path;
                        variant.speciesId = (int)legendObj["speciesId"];
                        species.Variants.Add(variant);
                        db.SaveChanges();
                    }
                }
            }
            Console.WriteLine("AddDataToDatabase has Finished!");
            return Task.CompletedTask;
        }

        //Only needs to be run once at the start. *Get contentID itemId name loadoutsIcon level speciesName speciesID rarity rarityValue*
        private static Task GetAllSpecies(List<String> companionIdList, List<int> skinIdList)
        {
            Console.WriteLine("GetRiotJsonData() Started...");

            var jsonData = new HttpClient().GetStringAsync("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/companions.json");
            jsonData.Wait();
            JArray Objects = JsonConvert.DeserializeObject<JArray>(jsonData.Result);

            var newList = Objects.Where(y => y["level"].ToString().Equals("1") &&  y["rarity"].ToString().Equals("Default"))
            .GroupBy(x => x["speciesName"])
            .Select(x => x.First()).ToList();
            List<Species> speciesList = new();
            
            foreach (var item in newList)
            {
                string loadoutsIcon = (string)item["loadoutsIcon"];
                string[] splitPath = loadoutsIcon.Split("/");
                string pngName = splitPath[^1].ToLower();
                string path = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/" + pngName;

                speciesList.Add(new Species()
                {
                    speciesCode = (int)item["speciesId"],
                    speciesName = (string)item["speciesName"],
                    defaultImg = path.Trim()
                }); 
            }
            using (var db = new LegendsDBContext())
            {

                //db.Entry(speciesList[0]).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.species.AddRange(speciesList);
                db.SaveChanges();
            }
            Console.WriteLine("GetRiotJsonData() Finished.");
            return Task.CompletedTask;
        }

        private static Task ParseApiData(List<LeagueEntry> entry, RiotGamesApi riotApi, List<String> companionIdList, List<int> skinIdList)
        {
            Console.WriteLine("ParseApiData() Called");
            List<String> summonerIdList = new();
            foreach (var match in entry)
            {
                //Console.WriteLine($"SummonerId: {match.SummonerId}");
                summonerIdList.Add(match.SummonerId);
            }

            //foreach (var id in summonerIdList)
            for (int j = 0; j < 2; j++)
            {
                var puuid = riotApi.TftSummonerV1().GetBySummonerId(PlatformRoute.NA1, summonerIdList[j]);
                var matchList = riotApi.TftMatchV1().GetMatchIdsByPUUID(RegionalRoute.AMERICAS, puuid.Puuid);
                for (int i = 0; i < 2; i++)
                {
                    var match = riotApi.TftMatchV1().GetMatch(RegionalRoute.AMERICAS, matchList[i]);
                    if (match != null)
                    {
                        foreach (var participant in match.Info.Participants)
                        {
                            Console.WriteLine($"ContentID: {participant.Companion.ContentID}");
                            Console.WriteLine($"SkinID: {participant.Companion.SkinID}");
                            companionIdList.Add(participant.Companion.ContentID);
                            skinIdList.Add(participant.Companion.SkinID);
                        }
                    }
                }
            }

            return Task.CompletedTask;
        }
    }
}
