import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
import NoProjectsSelected from "./components/NoProjectsSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";

function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })

  function handleStartAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelProject(){
    setProjectState(prevState =>{
      return{
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(newProjectsInfo){
    const projectId = Math.random()
    
    setProjectState(prevState => {
      const newProject = {
        ...newProjectsInfo,
        id: projectId,
      }

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
    
  }

  function handleAddTask(taskMessage){
    const taskId = Math.random()

    setProjectState(prevState => {

      const newTask = {
        text: taskMessage ,
        id: taskId,
      }

      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }

    })
  }

  function handleDeleteProject(){
    setProjectState((prevState) =>{
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId 
        )
      }
    })    
  }
  function handleDeleteTask(id){
    setProjectState((prevState) =>{
      return{
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        )
      }
    })    
  }

  function handleClickProject(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  console.log(projectState)



const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)


  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} task={projectState.tasks} onDeleteTask={handleDeleteTask}/>;

  if(projectState.selectedProjectId === undefined){
    content = <NoProjectsSelected onAddProject={handleStartAddProject}/>
  } else if(projectState.selectedProjectId === null ){
    content = <NewProject onAddproject={handleAddProject} onCancelProject={handleCancelProject} />
  } 
  
  return (
    <main className="h-screen my-8 flex gap-8 ">
     
     <ProjectsSidebar onClickProject={handleClickProject} onAddProject={handleStartAddProject} projects={projectState.projects} selectProjectId={projectState.selectedProjectId}/>
     
     {content}
     
    </main>
  );
}

export default App;
