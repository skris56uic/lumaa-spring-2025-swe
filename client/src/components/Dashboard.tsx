import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  IconButton,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fab,
} from "@mui/material";
import { TaskResponse } from "../apis/interfaces";
import { getTasks, deleteTask, updateTask, createTask } from "../apis";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../components/UserContext";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskResponse | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchTasks(user.id.toString(), user.token);
    } else {
      console.log("User is not defined");
    }
  }, [user]);

  const fetchTasks = async (userId: string, token: string) => {
    try {
      console.log("Fetching tasks for user:", userId);
      const tasks = await getTasks(userId, token);
      setTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id, user!.id, user!.token);
      fetchTasks(user!.id.toString(), user!.token);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEdit = (task: TaskResponse) => {
    setCurrentTask(task);
    setIsEditMode(true);
    setOpen(true);
  };

  const handleToggleComplete = async (task: TaskResponse) => {
    try {
      const updatedTask = { ...task, isComplete: !task.isComplete };
      await updateTask(updatedTask, user!.token);
      fetchTasks(user!.id.toString(), user!.token);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask(null);
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (currentTask) {
      try {
        if (isEditMode) {
          await updateTask(currentTask, user!.token);
        } else {
          await createTask(currentTask, user!.id, user!.token);
        }
        fetchTasks(user!.id.toString(), user!.token);
        handleClose();
      } catch (error) {
        console.error("Failed to save task:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTask) {
      setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
    }
  };

  const handleAddTask = () => {
    setCurrentTask({
      title: "",
      description: "",
      isComplete: false,
      userId: user!.id,
    });
    setIsEditMode(false);
    setOpen(true);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Task List
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={task.isComplete}
                      onChange={() => handleToggleComplete(task)}
                      inputProps={{ "aria-label": "Mark task as complete" }}
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {task.title}
                    </Typography>
                    {task.isComplete && <CheckCircleIcon color="success" />}
                  </Box>
                  <Typography color="textSecondary">
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(task)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(task.id!)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleAddTask}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={currentTask?.title || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={currentTask?.description || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
