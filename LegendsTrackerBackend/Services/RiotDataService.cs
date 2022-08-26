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

        public Task GetApiData()
        {
            Console.WriteLine("GetApiData() has been called...");
            var riotApi = RiotGamesApi.NewInstance(Configuration.GetConnectionString("ApiKey"));
            var division = "I";
            var entry = riotApi.TftLeagueV1().GetLeagueEntries(PlatformRoute.NA1, Tier.DIAMOND, division);
            List<string> CompanionIDList = new();
            List<int> SkinIDList = new();
            if (entry != null)
            {
                //GetAllSpecies();
                //ParseApiData(entry.ToList(), riotApi, CompanionIDList, SkinIDList);
                //AddDataToDatabase(CompanionIDList, SkinIDList);
                //UpdateTotalCount();
            }
            Console.WriteLine("GetApiData() has Finished!");
            return Task.CompletedTask;
        }

        private static Task UpdateTotalCount()
        {
            Console.WriteLine("UpdateTotalCount() has Started...");
            using (var db = new LegendsDBContext())
            {
                var speciesList = db.Species.ToList();
                foreach (var species in speciesList)
                {
                    var variantList = species.Variants.ToList();
                    int totalCount = 0;
                    foreach (var variant in variantList)
                    {
                        totalCount += variant.count;
                    }
                    species.TotalCount = totalCount;
                    db.Species.Update(species);
                }
                db.SaveChanges();
            }
            Console.WriteLine("UpdateTotalCount() has Finished!");
            return Task.CompletedTask;
        }

        private static Task AddDataToDatabase(List<String> companionIdList, List<int> speciesIdList)
        {
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
                    Species species = db.Species.Include(s => s.Variants).FirstOrDefault(s => s.SpeciesCode == (int)legendObj["speciesId"]);
                    Variant variant1 = db.Variants.FirstOrDefault(c => c.VariantCode == (int)legendObj["itemId"]);
                    if (variant1 != null)
                    {
                        Console.WriteLine("Duplicate Found");
                        variant1.count++;
                    }
                    else
                    {
                        
                        Variant variant = new Variant();
                        variant.VariantCode = (int)legendObj["itemId"];
                        variant.level = (int)legendObj["level"];
                        variant.name = (string)legendObj["name"];
                        variant.count = 1;
                        variant.imgPath = path;
                        variant.SpeciesId = (int)legendObj["speciesId"];
                        var rarity = (string)legendObj["rarity"];
                        if (!species.SpeciesName.Equals((string)legendObj["name"]) && rarity.Equals("Default"))
                        {
                            variant.rarity = "Rare";
                        }
                        else
                        {
                            variant.rarity = rarity;
                        }
                        if (species.Variants.FirstOrDefault() == null)
                        {
                            List<Variant> variants = new();
                            variants.Add(variant);
                            species.Variants = variants;
                            //Console.WriteLine("Species Variant List is NULL");
                        }
                        else
                        {
                            species.Variants.Add(variant);
                            //Console.WriteLine(species.Variants.Count());
                            //Console.WriteLine("Species Variant List NOT NULL");
                        }
                        Console.WriteLine("Duplicate NOT Found");
                    }
                    db.SaveChanges();
                }
            }
            Console.WriteLine("AddDataToDatabase has Finished!");
            return Task.CompletedTask;
        }

        //Only needs to be run once at the start. *Get contentID itemId name loadoutsIcon level speciesName speciesID rarity rarityValue*
        private static Task GetAllSpecies()
        {
            Console.WriteLine("GetRiotJsonData() Started...");

            var jsonData = new HttpClient().GetStringAsync("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/companions.json");
            jsonData.Wait();
            JArray Objects = JsonConvert.DeserializeObject<JArray>(jsonData.Result);

            var newList = Objects.Where(y => y["level"].ToString().Equals("1") && y["rarity"].ToString().Equals("Default"))
            .GroupBy(x => x["speciesName"])
            .Select(x => x.First()).ToList();
            List<Species> speciesList = new();
            List<Variant> variants = new();

            using (var db = new LegendsDBContext())
            {
                foreach (var item in newList)
                {
                    int speciesId = (int)item["speciesId"];
                    string speciesName = (string)item["speciesName"];
                    string loadoutsIcon = (string)item["loadoutsIcon"];
                    string[] splitPath = loadoutsIcon.Split("/");
                    string pngName = splitPath[^1].ToLower();
                    string path = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/" + pngName;
                    if (!db.Species.Any(s => s.SpeciesName.Equals(speciesName))){
                        Console.WriteLine($"New species found *{speciesName}*");
                        speciesList.Add(new Species()
                        {
                            SpeciesCode = speciesId,
                            SpeciesName = speciesName,
                            DefaultImg = path.Trim(),
                            TotalCount = 0,
                            Variants = variants
                        });
                    }
                }
                db.Species.AddRange(speciesList);
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
            for (int j = 0; j < 20; j++)
            {
                var puuid = riotApi.TftSummonerV1().GetBySummonerId(PlatformRoute.NA1, summonerIdList[j]);
                var matchList = riotApi.TftMatchV1().GetMatchIdsByPUUID(RegionalRoute.AMERICAS, puuid.Puuid);
                for (int i = 0; i < 5; i++)
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
