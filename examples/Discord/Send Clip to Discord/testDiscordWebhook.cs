using System;
using System.Net.Http;
using Newtonsoft.Json;

public class CPHInline
{

    public bool Execute()
    {

        var discordWebhook = args["webhook"].ToString();

        var content = "Testing the Discord Webhook";

        string discordJson = JsonConvert.SerializeObject(new
        {
            content = $"{content}\n"
        });


        var body = new StringContent(
          discordJson,
          System.Text.Encoding.UTF8,
          "application/json"
          );

        HttpClient httpClient = new HttpClient();
        httpClient.PostAsync(discordWebhook, body).Wait();
        httpClient.Dispose();


        return true;
    }
}
