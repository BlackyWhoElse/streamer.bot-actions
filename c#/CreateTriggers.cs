using System;
using System.Collections.Generic;

public class CPHInline
{
  public void Init()
  {
    // Features
    Dictionary<string, List<List<string>>> FeaturesData = new Dictionary<string, List<List<string>>>
        {
          {
                "-Any-",
                new List<List<string>>
                {
                    new List<string>
                    {
                        "match_end",
                        "match_start",
                    },
                    new List<string>
                    {
                    }
                }
            },
            {
                "Apex Legends",
                new List<List<string>>
                {
                    new List<string>
                    {
                        "match_end",
                        "match_start",
                        "round_end",
                        "round_start",
                        "assist",
                        "kill",
                        "knockdown",
                        "death",
                        "knocked_out",
                        "healed_from_ko",
                        "respawn",
                        "kill_feed",
                        "damage",
                    },
                    new List<string>
                    {
                        "match_state",
                        "name",
                        "ultimate_cooldown",
                        "legendSelect",
                        "teammate",
                        "team_info",
                        "victory",
                        "location",
                        "roster",
                        "match_summary",
                        "totalDamageDealt",
                        "inUse",
                        "inventory",
                        "weapons",
                        "arena_score",
                        "game_mode",
                        "map_id",
                        "pseudo_match_id",
                        "tabs",
                        "phase",
                        "language"
                    }
                }
            },
            {
                "Axie Infinity Origin",
                new List<List<string>>
                {
                    new List<string>
                    {
                        "match_end",
                        "match_start",
                    },
                    new List<string>
                    {
                        "battle_state",
                        "cards_hand",
                        "deck_piles",
                        "fighter",
                        "last_card_played",
                        "match_outcome",
                        "player",
                        "ronin_address"
                    }
                }
            }
        };



    foreach (var gameFeatures in FeaturesData)
    {
      string game = gameFeatures.Key;

      if(game == "-Any-"){
        machine_game = "";
      }else{
        machine_game = game.Replace(" ", "_").ToLower();
      }

      bool l = true;

      foreach (var featureList in gameFeatures.Value)
      {
        foreach (var feature in featureList)
        {

          CPH.RegisterCustomTrigger(feature, machine_game +"_"+feature, new[] { "Overwolf", game, l ? "Events" : "Info updates" });
        }
        l = false;
      }
    }
  }
}
