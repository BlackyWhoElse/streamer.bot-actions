using System;
using System.Collections.Generic;

public class CPHInline
{
  public void Init()
  {
    // Features
    Dictionary<string, List<List<string>>> FeaturesData = new Dictionary<string, List<List<string>>>
        {
          {"-Any-",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                        "match_end",
                        "match_start",
                        "round_end",
                        "round_start",
                        "assist",
                        "kill",
                        "death",
                    },
                    // Info Updates
                    new List<string>
                    {
                    }
                }
            },
          {"Apex Legends",
                new List<List<string>>
                {   // Events
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
                    // Info Updates
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
          {"Axie Infinity Origin",
                new List<List<string>>
                {
                    new List<string>
                    {
                        "match_end",
                        "match_start",
                    },
                    // Info Updates
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
            },
          {"Call of Duty: Vanguard",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "match_end",
                      "match_start",
                      "round_outcome",
                      "kill",
                      "death"
                    },
                    // Info Updates
                    new List<string>
                    {
                      "game_mode",
                      "scene",
                      "player_name"
                    }
                }
            },
          {"Call of Duty: Warzone Caldera",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "match_end",
                      "match_start",
                      "kill",
                      "death",
                      "assist",
                    },
                    // Info Updates
                    new List<string>
                    {
                      "battlenet_tag",
                    }
                }
            },
          {"Counter-Strike: Global Offensive",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "kill",
                      "death",
                      "assist",
                      "headshot",
                      "round_start",
                      "match_start",
                      "match_end",
                      "team_round_win",
                      "bomb_planted",
                      "bomb_change",
                      "reloading",
                      "fired",
                      "weapon_change",
                      "weapon_acquired",
                      "player_activity_change",
                      "team_set",
                      "mvp",
                      "kill_feed"
                    },
                    // Info Updates
                    new List<string>
                    {
                      "map",
                      "mode",
                      "numOfRound",
                      "phase",
                      "scene",
                      "score",
                      "steamid",
                      "team",
                      "totalDeaths",
                      "totalKills",
                      "totalMvps",
                      "lobby",
                      "match",
                      "replay_list",
                      "ping",
                      "game_mode",
                      "match_outcome",
                      "phase",
                      "pseudo_match_id",
                      "server_info",
                      "scoreboard"
                    }
                }
            },
          {"Diablo 2 Resurrected",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "dropped_item",
                      "match_end",
                      "match_start",
                      "player_died",
                      "player_spawn"
                    },
                    // Info Updates
                    new List<string>
                    {
                      "player_class",
                      "player_experience",
                      "player_level",
                      "act",
                      "item"
                    }
                }
            },
          {"Diablo 4",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                        "match_end",
                        "match_start",
                    },
                    // Info Updates
                    new List<string>
                    {
                      "location"
                    }
                }
            },
        };



    foreach (var gameFeatures in FeaturesData)
    {
      string game = gameFeatures.Key;
      string machine_game = game == "-Any-" ? "" : game.Replace(" ", "_").ToLower();
      bool l = true;

      foreach (var featureList in gameFeatures.Value)
      {
        foreach (var feature in featureList)
        {
          // kill / apex_legends_klll
          string name = game == "-Any-" ? feature : game.Replace(" ", "_").ToLower() + "_" + feature;
          CPH.RegisterCustomTrigger(feature, name, new[] { "Overwolf", game, l ? "Events" : "Info updates" });
        }
        l = false;
      }
    }
  }
}
