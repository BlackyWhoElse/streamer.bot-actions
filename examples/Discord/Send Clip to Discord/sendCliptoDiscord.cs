using System;
using System.Net.Http;
using Newtonsoft.Json;

public class CPHInline
{

    public bool Execute()
    {
        var discordWebhook = args["webhook"].ToString();
        var user = args["userName"];

        CPH.LogInfo($"{user} is creating a clip....");

        // Checking if stream is Live
        if (CPH.ObsIsStreaming())
        {

            var clip = CPH.CreateClip();

            // Post clip Link in Chat
            CPH.SendMessage($"imGlitch @{user} clipped {clip.Url}");

            // Post to Discord Webhook
            CPH.LogInfo($"Posting clip to discord....");

            string discordJson = JsonConvert.SerializeObject(new
            {
                content = $"{user} just clipped\n{clip.Url}"
            });

            var body = new StringContent(
                discordJson,
                System.Text.Encoding.UTF8,
                "application/json"
                );

            HttpClient httpClient = new HttpClient();
            try
            {
                httpClient.PostAsync(discordWebhook, body).Wait();
                httpClient.Dispose();

            }
            catch (Exception e) {
                CPH.LogInfo("Could't perfom post to discord webhook");
            }

        }
        else
        {
            CPH.SendMessage($"imGlitch @{user}, clips cant be made when the stream is offline");
        }

        return true;
    }
}