import NewTask from "../components/NewTask"
import { useState } from "react"

export default function Tasks({task, onAddTask, onDeleteTask}){

    return(
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask 
                onAddTask={onAddTask}
            />
            {task.length === 0 && 
             <p className="text-stone-800 mt-4">
                This project does not have any task yet.
            </p>
            }
            {task.length > 0 && 
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {task.map((tasks) => (
                    <li key={tasks.id} className="flex justify-between my-4">
                      <span>{tasks.text}</span>  
                      <button onClick={()=>onDeleteTask(tasks.id)} className="text-stone-700 hover:text-red-500">Clear</button>
                    </li>
                ))}
            </ul>
}
        </section>
    )
}