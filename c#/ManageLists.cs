using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

public class TodoItem
{
  public string Title { get; set; }
  public string Description { get; set; }
  public bool IsDone { get; set; }

  public TodoItem(string title, string description)
  {
    Title = title;
    Description = description;
    IsDone = false;
  }

  public void MarkAsDone()
  {
    IsDone = true;
  }

  public override string ToString()
  {
    return $"{(IsDone ? "[X]" : "[ ]")} {Title}: {Description}";
  }
}

public class TodoList
{
  public string Name { get; set; }
  private List<TodoItem> items;

  public TodoList(string name)
  {
    Name = name;
    items = new List<TodoItem>();
  }

  public void AddItem(TodoItem item)
  {
    items.Add(item);
  }

  public void RemoveItem(TodoItem item)
  {
    items.Remove(item);
  }

  public void MarkItemAsDone(int index)
  {
    if (index >= 0 && index < items.Count)
    {
      items[index].MarkAsDone();
    }
  }

  public string PrintTodoList()
  {

    string output;
    if (items.Count == 0)
    {

      output = ($"Todo list '{Name}' is empty.");
    }
    else
    {
      output = ($"Todo list '{Name}':");
      for (int i = 0; i < items.Count; i++)
      {
        output += ($"{i + 1}. {items[i]}");
      }
    }
    return output;
  }

  public List<TodoItem> GetItems()
  {
    return items;
  }
}

public class TodoListsManager
{
  private List<TodoList> lists;

  public TodoListsManager()
  {
    lists = new List<TodoList>();
  }

  public void AddList(TodoList todoList)
  {
    lists.Add(todoList);
  }

  public void RemoveList(TodoList todoList)
  {
    lists.Remove(todoList);
  }

  public string PrintAllLists()
  {
    string output = "";
    if (lists.Count == 0)
    {
      output = ("No todo lists available.");
    }
    else
    {
      foreach (var list in lists)
      {
        output = list.PrintTodoList();
      }
    }
    return output;
  }

  public void SaveToFile(string filePath)
  {
    string json = JsonConvert.SerializeObject(lists, Formatting.Indented);
    File.WriteAllText(filePath, json);
  }

  public void LoadFromFile(string filePath)
  {
    if (File.Exists(filePath))
    {
      string json = File.ReadAllText(filePath);
      lists = JsonConvert.DeserializeObject<List<TodoList>>(json);
    }
  }
}
public class CPHInline
{
  public bool Execute()
  {
    TodoListsManager listsManager = new TodoListsManager();

    // Load the lists from the JSON file
    string filePath = "C:/Users/Timo/Documents/GitHub/streamer.bot-actions/c#/todo.json";
    listsManager.LoadFromFile(filePath);

    // Print the loaded lists
    CPH.SendMessage("Loaded Todo Lists:");
    CPH.SendMessage(listsManager.PrintAllLists());;
    return true;
  }
}
