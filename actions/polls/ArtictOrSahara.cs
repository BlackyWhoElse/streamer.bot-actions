// How are you doing?
// Best day today
// Really good
// Just ok
// Not so good
// Terrible - pray for me

// Base code by https://extensions.streamer.bot/en/extensions/dynamic-poll

using System;
using System.Collections.Generic;

public class CPHInline
{
    public bool Execute(){
        var pollQuestion = "Would you rather live for the rest of your life in the Arctic or in the Sahara desert?";

        var pollOptions = new List<string>();
        pollOptions.Add("The Arctic");
        pollOptions.Add("The Sahara desert");

        var duration = 120;

        var bitsPerVote = 0;
        var channelPointsPerVote = 0;

        CPH.TwitchPollCreate(pollQuestion, pollOptions, duration, bitsPerVote, channelPointsPerVote);

        return true;
    }
}