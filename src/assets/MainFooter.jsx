import { IoAdd } from "react-icons/io5";
import { createWindow} from "../Hooks/FetchHooks";
const MainFooter = () => {  
    
    const openWindow = async () => {
        await createWindow("create", "index.html", 250.0, 350.0);
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