using System;
using System.Collections.Generic;

public class CPHInline
{
  public void Init()
  {
    // Features
    // Check this documentation for feature status : https://overwolf.github.io/status
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
          {"Dota 2",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "game_state_changed",
                      "match_ended",
                      "kill",
                      "assist",
                      "death",
                      "cs",
                      "hero_attributes_skilled",
                      "hero_ability_skilled",
                      "hero_ability_used",
                      "match_state_changed",
                      "clock_time_changed",
                      "game_over",
                      "new_game",
                    },
                    // Info Updates
                    new List<string>
                    {
                      "party",
                      "bans",
                      "draft",
                      "players",
                      "game_mode",
                      "pseudo_match_id",
                      "hero",
                      "mmr",
                      "steam_id",
                      "team",
                      "game_state",
                      "match_state",
                    }
                }
          },
          {"Escape From Tarkov",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "death",
                      "match_end",
                      "match_start",
                    },
                    // Info Updates
                    new List<string>
                    {
                      "map",
                      "phase",
                    }
                }
          },
          {"Final Fantasy XIV",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                    },
                    // Info Updates
                    new List<string>
                    {
                      "contact"
                    }
                }
          },
          {"Fortnite",
                new List<List<string>>
                {   // Events
                    new List<string>
                    {
                      "hit",
                      "kill",
                      "knockout",
                      "generic",
                      "killed",
                      "killer",
                      "revived",
                      "death",
                      "knockedout",
                      "matchEnd",
                      "matchStart",
                    },
                    // Info Updates
                    new List<string>
                    {
                      "item",
                      "quickbar",
                      "selected_material",
                      "selected_slot",
                      "kills",
                      "matchID",
                      "partyID",
                      "pseudo_match_id",
                      "roster",
                      "sessionID",
                      "skirmish",
                      "ticketID",
                      "userID",
                      "rank",
                      "total_players",
                      "total_teams",
                      "accuracy",
                      "health",
                      "name",
                      "shield",
                      "total_shots",
                      "phase",
                      "location",
                      "nicknames",
                      "ping",
                      "mode",
                      "creative_map",
                      "map",
                    }
                }
          },
          {"Halo Infinite",
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
                      "game_mode",
                      "game_type",
                      "local_player_stats",
                      "match_outcome",
                      "playlist",
                      "roster",
                      "scene",
                    }
                }
          },
          {"Hearthstone",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "match_end",
                      "match_outcome",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "collection",
                      "scene_state",
                      "Adventure Deck",
                      "adventure_loot_options",
                      "deck_id",
                      "selected_deck",
                      "adventure_stats",
                      "battlegrounds_rating",
                      "localPlayer",
                      "match_type",
                      "opponent",
                      "pseudo_match_id",
                      "arena_draft"
                  }
              }
          },
          {"Heroes of the Storm",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "gates_opened",
                      "match_end",
                      "match_start",
                      "talent_available",
                      "assist",
                      "kill",
                      "minion_kill",
                      "takedown",
                      "death"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "roster",
                      "bans",
                      "draft",
                      "game_mode",
                      "match_state",
                      "pseudo_match_id",
                      "score",
                      "teams_level",
                      "scene",
                      "battletag"
                  }
              }
          },
          {"League of Legends",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "matchStart",
                      "kill",
                      "death",
                      "respawn",
                      "assist",
                      "ability",
                      "usedAbility",
                      "ace",
                      "defeat",
                      "dominating",
                      "double_kill",
                      "executed",
                      "first_blood",
                      "godlike",
                      "inhibitor_destroy",
                      "inhibitor_respawn",
                      "killing_spree",
                      "legendary",
                      "minions_30_sec",
                      "minions_spawn",
                      "penta_kill",
                      "quadra_kill",
                      "rampage",
                      "self_slain",
                      "shutdown",
                      "slain",
                      "triple_kill",
                      "turret_destroy",
                      "unstoppable",
                      "victory",
                      "welcome_rift",
                      "match_clock",
                      "port",
                      "magic_damage_dealt_player",
                      "magic_damage_dealt_to_champions",
                      "magic_damage_taken",
                      "physical_damage_dealt_player",
                      "physical_damage_dealt_to_champions",
                      "physical_damage_taken",
                      "true_damage_dealt_player",
                      "true_damage_dealt_to_champions",
                      "true_damage_taken",
                      "chat"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "accountId",
                      "champion",
                      "division",
                      "id",
                      "level",
                      "queue",
                      "region",
                      "tier",
                      "gameMode",
                      "teams",
                      "gold",
                      "minionKills",
                      "neutralMinionKills",
                      "matchId",
                      "matchStarted",
                      "level",
                      "doubleKills",
                      "kills",
                      "pentaKills",
                      "quadraKills",
                      "tripleKills",
                      "deaths",
                      "ping",
                      "game_mode",
                      "match_paused",
                      "pseudo_match_id",
                      "active_player",
                      "all_players",
                      "events",
                      "game_data",
                      "total_heal",
                      "total_heal_on_teammates",
                      "total_units_healed",
                      "total_damage_dealt",
                      "total_damage_dealt_to_buildings",
                      "total_damage_dealt_to_champions",
                      "total_damage_dealt_to_objectives",
                      "total_damage_dealt_to_turrets",
                      "total_damage_self_mitigated",
                      "total_damage_taken",
                      "jungle_camp",
                      "team_frames"
                  }
              }
          },
          {"LEAP",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "death",
                      "kill",
                      "match_end",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "match_outcome",
                      "match_state",
                      "server_info"
                  }
              }
          },
          {"Legends of Runeterra",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "match_end",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "active_deck",
                      "card_positions",
                      "game_result"
                  }
              }
          },
          {"Lost Ark",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "match_end",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "player_class",
                      "mob_details",
                      "location",
                      "map"
                  }
              }
          },
          {"Magic: The Gathering Arena",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "draft_end",
                      "draft_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "main_deck_cards",
                      "scene",
                      "sideboard_cards",
                      "draft_cards",
                      "draft_pack",
                      "draft_picked_ca"
                  }
              }
          },
          {"Minecraft",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "chat",
                      "match_end",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "mc_version",
                      "name",
                      "player",
                      "scene",
                      "facing",
                      "general_stats",
                      "items_stats",
                      "location",
                      "mobs_stats",
                      "server",
                      "ping",
                      "addon"
                  }
              }
          },
          {"New World",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      // No events for New World
                  },
                  // Info Updates
                  new List<string>
                  {
                      "location",
                      "map",
                      "player_name",
                      "world_name"
                  }
              }
          },
          {"Overwatch 2",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "match_end",
                      "match_start",
                      "elimination",
                      "death",
                      "assist"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "map",
                      "eliminations",
                      "deaths",
                      "assists",
                      "game_mode",
                      "game_state"
                  }
              }
          },
          {"Path of Exile",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "boss_kill",
                      "death",
                      "chat",
                      "match_outcome"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "current_zone",
                      "opened_page",
                      "character_level",
                      "character_name",
                      "chat_language",
                      "language"
                  }
              }
          },
          {"PlayerUnknown's Battlegrounds",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "damage_dealt",
                      "fire",
                      "headshot",
                      "kill",
                      "knockout",
                      "matchEnd",
                      "matchStart",
                      "matchSummary",
                      "damageTaken",
                      "death",
                      "knockedout",
                      "time_to_next_circle",
                      "jump",
                      "revived",
                      "killer"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "headshots",
                      "kills",
                      "max_kill_distance",
                      "total_damage_dealt",
                      "match_id",
                      "mode",
                      "me",
                      "total",
                      "blue_zone",
                      "location",
                      "red_zone",
                      "safe_zone",
                      "aiming",
                      "bodyPosition",
                      "equipped",
                      "freeView",
                      "health",
                      "inVehicle",
                      "inventory",
                      "movement",
                      "name",
                      "stance",
                      "view",
                      "weaponState",
                      "nicknames",
                      "team_index",
                      "team_location",
                      "phase",
                      "map",
                      "roster",
                      "ping",
                      "pseudo_match_i"
                  }
              }
          },
          {"Rainbow Six Siege",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "matchOutcome",
                      "roundEnd",
                      "roundOutcome",
                      "roundStart",
                      "headshot",
                      "kill",
                      "death",
                      "killer",
                      "knockedout",
                      "match_end",
                      "match_start",
                      "defuser_disabled",
                      "defuser_planted"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "phase",
                      "number",
                      "score",
                      "deaths",
                      "defuser",
                      "headshots",
                      "health",
                      "is_local",
                      "kills",
                      "operator",
                      "player_id",
                      "roster",
                      "score",
                      "team",
                      "death_log",
                      "game_mode",
                      "general_log",
                      "kill_log",
                      "map_id",
                      "match_end_log",
                      "match_id",
                      "match_start_log",
                      "move_log",
                      "pseudo_match_id",
                      "round_end_log",
                      "round_outcome_type",
                      "round_start_log",
                      "score_log",
                      "account_id_log",
                      "name"
                  }
              }
          },
          {"Rocket League",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "goal",
                      "score",
                      "teamGoal",
                      "opposingTeamGoal",
                      "defeat",
                      "matchEnd",
                      "matchStart",
                      "victory",
                      "playerJoined",
                      "playerLeft",
                      "rosterChange",
                      "death"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "ended",
                      "gameMode",
                      "gameState",
                      "gameType",
                      "matchType",
                      "maxPlayers",
                      "ranked",
                      "started",
                      "player",
                      "team",
                      "team1_score",
                      "team2_score",
                      "goals",
                      "name",
                      "score",
                      "steamId",
                      "team",
                      "team_score",
                      "action_points",
                      "arena",
                      "mutator_settings",
                      "pseudo_match_id",
                      "server_info",
                      "car_look_inventory",
                      "trade_menu_opened",
                      "trade_my_inventory",
                      "trade_my_proposition",
                      "trade_opponent_proposition"
                  }
              }
          },
          {"Sons of the Forest",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "death",
                      "match_end",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "location",
                      "npc_location"
                  }
              }
          },
          {"Splitgate: Arena Warfare",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "matchEnd",
                      "matchOutcome",
                      "matchStart",
                      "killFeed",
                      "disconnected",
                      "reconnected",
                      "headshot",
                      "kill",
                      "killThroughPortal",
                      "meleeKill",
                      "portalKill",
                      "victim",
                      "death",
                      "killer",
                      "portalClosed",
                      "portalCreated",
                      "portalUsed"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "scene",
                      "mapName",
                      "mode",
                      "score",
                      "state",
                      "timer",
                      "health",
                      "id",
                      "name",
                      "team",
                      "location"
                  }
              }
          },
          {"StarCraft II",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "match_end",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      // No info updates for StarCraft II
                  }
              }
          },
          {"Teamfight Tactics PBE",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "battle_end",
                      "battle_start",
                      "match_end",
                      "match_start",
                      "round_end",
                      "round_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "active_player",
                      "all_players",
                      "events",
                      "game_data",
                      "carousel_pieces",
                      "bench_pieces",
                      "board_pieces",
                      "shop_pieces",
                      "player_status",
                      "gold",
                      "health",
                      "rank",
                      "summoner_name",
                      "xp",
                      "battle_state",
                      "game_mode",
                      "local_player_damage",
                      "match_state",
                      "opponent",
                      "pseudo_match_id",
                      "round_outcome",
                      "round_type",
                      "me",
                      "picked_augment"
                  }
              }
          },
          {"Teamfight Tactics",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "battle_end",
                      "battle_start",
                      "match_end",
                      "match_start",
                      "round_end",
                      "round_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "battle_state",
                      "game_mode",
                      "local_player_damage",
                      "match_state",
                      "opponent",
                      "round_outcome",
                      "round_type",
                      "augments",
                      "gold",
                      "health",
                      "picked_augment",
                      "rank",
                      "summoner_name",
                      "xp",
                      "player_status",
                      "shop_pieces",
                      "board_pieces",
                      "bench_pieces",
                      "carousel_pieces",
                      "active_player",
                      "all_players",
                      "events",
                      "game_data"
                  }
              }
          },
          {"Valheim",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "location",
                      "respawn",
                      "damage",
                      "kill"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "death",
                      "inventory",
                      "player_name",
                      "scene",
                      "state",
                      "time"
                  }
              }
          },
          {"Valorant",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "assist",
                      "headshot",
                      "kill",
                      "death",
                      "match_end",
                      "match_start",
                      "spike_defused",
                      "spike_detonated",
                      "spike_planted"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "scene",
                      "state",
                      "agent",
                      "player_id",
                      "player_name",
                      "region",
                      "assists",
                      "headshots",
                      "kills",
                      "deaths",
                      "game_mode",
                      "kill_feed",
                      "map",
                      "match_outcome",
                      "pseudo_match_id",
                      "roster",
                      "round_number",
                      "round_phase",
                      "round_report",
                      "score",
                      "scoreboard",
                      "team"
                  }
              }
          },
          {"Warframe",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      // No events for Warframe
                  },
                  // Info Updates
                  new List<string>
                  {
                      "username",
                      "highlighted",
                      "inventory"
                  }
              }
          },
          {"World of Tanks",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "assist",
                      "damage",
                      "kill",
                      "one_shot_kill",
                      "death",
                      "hit",
                      "match_end",
                      "match_outcome",
                      "match_start"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "game_state",
                      "map_name",
                      "pseudo_match_id"
                  }
              }
          },
          {"World of Warcraft",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "matchEnd",
                      "matchOutcome",
                      "matchStart",
                      "damage",
                      "kill",
                      "ribbon",
                      "death",
                      "hit"
                  },
                  // Info Updates
                  new List<string>
                  {
                      // No info updates for World of Warcraft
                  }
              }
          },
          {"World of Warships",
              new List<List<string>>
              {   // Events
                  new List<string>
                  {
                      "group_applicants",
                      "addon",
                      "var_addon"
                  },
                  // Info Updates
                  new List<string>
                  {
                      "game_start_timestamp",
                      "scene",
                      "id",
                      "playerName",
                      "realm",
                      "burning",
                      "flooding",
                      "health",
                      "level",
                      "mapName",
                      "name",
                      "nation",
                      "players",
                      "state",
                      "pseudo_match_id"
                  }
              }
          }
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

          CPH.RegisterCustomTrigger(feature, machine_game + "_" + feature, new[] { "Overwolf", game, l ? "Events" : "Info updates" });
        }
        l = false;
      }
    }
  }
}
