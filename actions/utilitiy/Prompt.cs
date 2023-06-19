using System;
using System.Windows.Forms;

public class CPHInline
{
  public string UserInput()
  {
    int inputs =  args.ContainsKey("inputs") ? Convert.ToInt32(args["inputs"].ToString()) : 1;
    string label = args["label"].ToString();
    string description = args["description"].ToString();
    string promptValue = Prompt.ShowInputDialog(inputs, description, label);
    return promptValue;
  }

  public bool ButtonInput()
  {
    string label = args["label"].ToString();
    string description = args["description"].ToString();
    string trueLable = args["trueLable"].ToString();
    string falseLable = args["falseLable"].ToString();
    string promptValue = Prompt.ShowButtonDialog(description, label, trueLable, falseLable);
    CPH.SetArgument("output", promptValue);
    return true;
  }
}

public class Prompt
{
  public static string ShowInputDialog(int inputs, string text, string caption)
  {
    Form prompt = new Form()
    {
      Width = 500,
      Height = 150,
      FormBorderStyle = FormBorderStyle.FixedDialog,
      Text = caption,
      StartPosition = FormStartPosition.CenterScreen,
      TopMost = true
    };
    Label textLabel = new Label()
    {
      Left = 50,
      Top = 20,
      Width = 400,
      Text = text
    };
    TextBox textBox = new TextBox()
    {
      Left = 50,
      Top = 50,
      Width = 400
    };
    Button confirmation = new Button()
    {
      Text = "Ok",
      Left = 350,
      Width = 100,
      Top = 70,
      DialogResult = DialogResult.OK
    };
    confirmation.Click += (sender, e) =>
    {
      prompt.Close();
    };
    prompt.Controls.Add(textBox);
    prompt.Controls.Add(confirmation);
    prompt.Controls.Add(textLabel);
    prompt.AcceptButton = confirmation;
    return prompt.ShowDialog() == DialogResult.OK ? textBox.Text : "";
  }

  public static string ShowButtonDialog(string text, string caption, string trueLable, string falseLable)
  {
    Form prompt = new Form()
    {
      Width = 500,
      Height = 150,
      FormBorderStyle = FormBorderStyle.FixedDialog,
      Text = caption,
      StartPosition = FormStartPosition.CenterScreen,
      TopMost = true
    };
    Label textLabel = new Label()
    {
      Left = 50,
      Top = 20,
      Width = 400,
      Text = text
    };
    Button choice1 = new Button()
    {
      Text = trueLable,
      Left = 250,
      Width = 100,
      Top = 70,
      DialogResult = DialogResult.OK
    };
    Button choice2 = new Button()
    {
      Text = falseLable,
      Left = 350,
      Width = 100,
      Top = 70,
    };
    choice1.Click += (sender, e) =>
    {
      prompt.Close();
    };
    choice2.Click += (sender, e) =>
    {
      prompt.Close();
    };
    prompt.Controls.Add(choice1);
    prompt.Controls.Add(choice2);
    prompt.Controls.Add(textLabel);
    prompt.AcceptButton = choice1;
    prompt.CancelButton = choice2;
    return prompt.ShowDialog() == DialogResult.OK ? "true" : "false";
  }

}
