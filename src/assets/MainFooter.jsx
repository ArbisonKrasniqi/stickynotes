import { IoAdd } from "react-icons/io5";
import { useContext } from "react";
import { MainContext } from "../App";
import { invoke } from "@tauri-apps/api";
import { openNewNoteWindow } from "../Hooks/FetchHooks";
const MainFooter = () => {  
    
    const openWindow = async () => {
        try {
            await openNewNoteWindow("create", "newNoteWindow.html");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="flex justify-start items-center h-[50px] text-dark bg-light shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
            <div className="h-full flex">
                <div className="flex items-center justify-center px-4 h-full w-[60px] cursor-pointer border border-transparent hover:border-gray-600 hover:bg-lighterDark hover:text-light transition-colors duration-150 ease-in-out"
                    onClick={() => {openWindow()}}
                >
                    <IoAdd/>
                </div>
            </div>
        </div>
    )
}

export default MainFooter;