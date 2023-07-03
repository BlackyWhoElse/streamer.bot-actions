using System;
using System.Collections.Generic;

class OverolfFeatures
{
  static void Main()
  {
    List<string> overwolfList = new List<string>
        {
            "gep_internal",
            "me",
            "localization",
            "team",
            "kill",
            "damage",
            "death",
            "revive",
            "match_state",
            "game_info",
            "match_info",
            "inventory",
            "location",
            "match_summary",
            "roster",
            "rank",
            "kill_feed",
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
            "info",
            "player_activity_change",
            "team_set",
            "replay",
            "counters",
            "mvp",
            "scoreboard",
            "live_client_data",
            "matchState",
            "respawn",
            "abilities",
            "gold",
            "minions",
            "summoner_info",
            "gameMode",
            "teams",
            "level",
            "announcer",
            "heal",
            "revived",
            "killer",
            "phase",
            "map",
            "defuser",
            "game_state_changed",
            "match_state_changed",
            "match_detected",
            "daytime_changed",
            "clock_time_changed",
            "ward_purchase_cooldown_changed",
            "match_ended",
            "cs",
            "xpm",
            "gpm",
            "hero_leveled_up",
            "hero_respawned",
            "hero_buyback_info_changed",
            "hero_boughtback",
            "hero_health_mana_info",
            "hero_status_effect_changed",
            "hero_attributes_skilled",
            "hero_ability_skilled",
            "hero_ability_used",
            "hero_ability_cooldown_changed",
            "hero_ability_changed",
            "hero_item_cooldown_changed",
            "hero_item_changed",
            "hero_item_used",
            "hero_item_consumed",
            "hero_item_charged",
            "party",
            "error",
            "hero_pool",
            "stats"
        };
/*

{
                "Fortnite",
                new List<string>
                {
                    "kill",
                    "killed",
                    "killer",
                    "revived",
                    "death",
                    "match",
                    "match_info",
                    "rank",
                    "me",
                    "phase",
                    "location",
                    "team",
                    "items",
                    "counters"
                }
            },
            {
                "CSGO",
                new List<string>
                {
                    "match_info",
                    "kill",
                    "death",
                    "assist",
                    "headshot",
                    "round_start",
                    "match_start",
                    "match_info",
                    "match_end",
                    "team_round_win",
                    "bomb_planted",
                    "bomb_change",
                    "reloading",
                    "fired",
                    "weapon_change",
                    "weapon_acquired",
                    "info",
                    "roster",
                    "player_activity_change",
                    "team_set",
                    "replay",
                    "counters",
                    "mvp",
                    "scoreboard",
                    "kill_feed"
                }
            },
            {
                "League of Legends",
                new List<string>
                {
                    "live_client_data",
                    "matchState",
                    "match_info",
                    "death",
                    "respawn",
                    "abilities",
                    "kill",
                    "assist",
                    "gold",
                    "minions",
                    "summoner_info",
                    "gameMode",
                    "teams",
                    "level",
                    "announcer",
                    "counters",
                    "damage",
                    "heal"
                }
            },
            {
                "Escape From Tarkov",
                new List<string>
                {
                    "match_info",
                    "game_info"
                }
            },
            {
                "Minecraft",
                new List<string>
                {
                    "game_info",
                    "match_info"
                }
            },
            {
                "Lost Ark",
                new List<string>
                {
                    "gep_internal",
                    "game_info",
                    "match_info"
                }
            },
            {
                "PUBG",
                new List<string>
                {
                    "kill",
                    "revived",
                    "death",
                    "killer",
                    "match",
                    "match_info",
                    "rank",
                    "counters",
                    "location",
                    "me",
                    "team",
                    "phase",
                    "map",
                    "roster"
                }
            },
            {
                "Rainbow Six Siege",
                new List<string>
                {
                    "game_info",
                    "match",
                    "match_info",
                    "roster",
                    "kill",
                    "death",
                    "me",
                    "defuser"
                }
            },
            {
                "Path of Exile",
                new List<string>
                {
                    "kill",
                    "death",
                    "me",
                    "match_info"
                }
            },
            {
                "Valorant",
                new List<string>
                {
                    "me",
                    "game_info",
                    "match_info",
                    "kill",
                    "death"
                }
            },
            {
                "Dota 2",
                new List<string>
                {
                    "game_state_changed",
                    "match_state_changed",
                    "match_detected",
                    "daytime_changed",
                    "clock_time_changed",
                    "ward_purchase_cooldown_changed",
                    "match_ended",
                    "kill",
                    "assist",
                    "death",
                    "cs",
                    "xpm",
                    "gpm",
                    "gold",
                    "hero_leveled_up",
                    "hero_respawned",
                    "hero_buyback_info_changed",
                    "hero_boughtback",
                    "hero_health_mana_info",
                    "hero_status_effect_changed",
                    "hero_attributes_skilled",
                    "hero_ability_skilled",
                    "hero_ability_used",
                    "hero_ability_cooldown_changed",
                    "hero_ability_changed",
                    "hero_item_cooldown_changed",
                    "hero_item_changed",
                    "hero_item_used",
                    "hero_item_consumed",
                    "hero_item_charged",
                    "match_info",
                    "roster",
                    "party",
                    "error",
                    "hero_pool",
                    "me",
                    "game"
                }
            },
            {
                "Call of Duty: Warzone",
                new List<string>
                {
                    "match_info",
                    "game_info",
                    "kill",
                    "death"
                }
            },
            {
                "Warframe",
                new List<string>
                {
                    "game_info",
                    "match_info"
                }
            },
            {
                "Rocket league",
                new List<string>
                {
                    "stats",
                    "roster",
                    "match",
                    "me",
                    "match_info",
                    "death",
                    "game_info"
                }
            }
        };
        */
    Dictionary<string, List<string>> overwolfObject = new Dictionary<string, List<string>>
        {
            { "Overwolf", overwolfList }
        };

    // Accessing the list of items:
    List<string> itemList = overwolfObject["Overwolf"];

    // Example: Printing the items
    foreach (var item in itemList)
    {
      Console.WriteLine(item);
    }
  }
}

