import { useState, useEffect } from "react";

function Tasks() {
  var [tasks, setTasks] = useState([]);
  var [title, setTitle] = useState("");
  var [description, setDescription] = useState("");
  var [editingId, setEditingId] = useState(null); // null means we are adding, not editing
  var [error, setError] = useState("");

  // same url + token stuff as login
  var url = import.meta.env.VITE_API_URL + "/api/tasks";
  var token = localStorage.getItem("token");

  // load my tasks when the page opens
  useEffect(function () {
    fetch(url, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setTasks(data);
      })
      .catch(function () {
        setError("could not load tasks");
      });
  }, []);

  // add or edit, depends on editingId
  function handleSubmit(e) {
    e.preventDefault();
    if (title === "") {
      setError("title is required");
      return;
    }
    setError("");

    if (editingId === null) {
      // CREATE
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ title: title, description: description })
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (newTask) {
          // put the new task in the list right away
          setTasks(tasks.concat(newTask));
          setTitle("");
          setDescription("");
        })
        .catch(function () {
          setError("could not add task");
        });
    } else {
      // UPDATE
      fetch(url + "/" + editingId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ title: title, description: description, status: "todo", priority: "medium" })
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (updated) {
          // swap the old task with the updated one
          setTasks(tasks.map(function (t) {
            if (t._id === editingId) {
              return updated;
            }
            return t;
          }));
          setEditingId(null);
          setTitle("");
          setDescription("");
        })
        .catch(function () {
          setError("could not update task");
        });
    }
  }

  // click Edit = fill the form with that task
  function startEdit(task) {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  }

  // DELETE (optimistic): remove from screen first, tell the server after
  function handleDelete(id) {
    if (!window.confirm("Delete this task?")) {
      return;
    }
    var oldTasks = tasks; // keep a copy in case the server says no
    setTasks(tasks.filter(function (t) {
      return t._id !== id;
    }));

    fetch(url + "/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    })
      .then(function (res) {
        if (!res.ok) {
          // server refused, put the task back
          setTasks(oldTasks);
          setError("could not delete task");
        }
      })
      .catch(function () {
        setTasks(oldTasks);
        setError("could not delete task");
      });
  }

  return (
    <div id="tasks">
      <h2>My Tasks</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={function (e) { setTitle(e.target.value); }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={function (e) { setDescription(e.target.value); }}
        />
        <button type="submit">{editingId === null ? "Add Task" : "Save Changes"}</button>
      </form>

      {error !== "" && <p>{error}</p>}

      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map(function (task) {
        return (
          <div key={task._id}>
            <b>{task.title}</b> - {task.description}
            <button onClick={function () { startEdit(task); }}>Edit</button>
            <button onClick={function () { handleDelete(task._id); }}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;