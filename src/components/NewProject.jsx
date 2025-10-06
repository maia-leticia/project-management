import InputComponent from "./InputComponent"
import Modal from "./Modal"
import { useRef } from "react"


export default function NewProject({onAddproject, onCancelProject} ) {
    const modal = useRef()
    const title = useRef()
    const description = useRef()
    const dueDate = useRef()


    function handleSaveProject(){
        const currentTitle = title.current.value
        const currentDescription = description.current.value
        const currentDueDate = dueDate.current.value

        if(
            currentTitle.trim()==="" || 
            currentDescription.trim()==="" || 
            currentDueDate===""
        ){
            modal.current.open()
            return;
        }

        onAddproject({
            title: currentTitle, 
            description: currentDescription, 
            dueDate: currentDueDate,
        })
    }

    const pStyle= "text-stone-600 mb-4"

    return(
        <>
        <Modal ref={modal} buttonCaption="Close">
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
            <p className={pStyle}>Oops... looks like you forgot to enter a value.</p>
            <p className={pStyle}>Make sure you provide a valid value for every input field</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button 
                    className="text-stone-800 hover:text-stone-950" onClick={onCancelProject} >Cancel</button>
                </li>
                <li>
                    <button
                    onClick={handleSaveProject}
                    className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>         
                </li>
            </menu>
            <div>
                <InputComponent ref={title} label="Title" />
                <InputComponent ref={description} label="Description" textarea/>
                <InputComponent type="date" ref={dueDate} label="Due Date" />
            </div>
        </div>
        </>
    )
}