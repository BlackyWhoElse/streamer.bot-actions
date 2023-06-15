using System;
using System.Windows.Forms;

public class CPHInline
{
  public bool UserInput()
  {

    string label = args["label"].ToString();
    string description = args["description"].ToString();

    string promptValue = Prompt.ShowDialog(description, label);

    CPH.SetArgument("output", promptValue);

    return true;
  }

}

public static class Prompt
{
  public static string ShowDialog(string text, string caption)
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
}
