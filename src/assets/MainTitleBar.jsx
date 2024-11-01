import { appWindow } from "@tauri-apps/api/window"
import '../App.css';
//Icons
import { IoCloseSharp, IoRemove} from "react-icons/io5";
import { RiSettingsLine } from "react-icons/ri";
import { createWindow } from "../Hooks/FetchHooks";

const TitleBar = ({title}) => {

    const minimizeWindow = async () => {
        await appWindow.minimize();
    };

    const closeWindow = async () => {
        await appWindow.close();
    };

    const openSettings = async () => {
        await createWindow("Settings", "index.html", 500, 400);
    };

    return(
        <div className="main-title-bar flex justify-between items-center h-[50px] text-dark bg-light shadow-md" data-tauri-drag-region>
            <div className="h-full main-title-bar-buttons flex">
                <div className="flex items-center justify-center px-4 h-full w-[60px] cursor-pointer border border-transparent hover:border-gray-600 hover:bg-lighterDark hover:text-light transition-colors duration-150 ease-in-out"
                    onClick={openSettings}
                >
                    <RiSettingsLine/>
                </div>
            </div>
            <p className="ml-[10%] mr-[10%]">{title}</p>
            <div className="h-full main-title-bar-buttons flex">
                <div className="flex items-center justify-center px-4 h-full w-[60px] cursor-pointer border border-transparent hover:border-gray-600 hover:bg-lighterDark hover:text-light transition-colors duration-150 ease-in-out" onClick={minimizeWindow}>
                    <IoRemove/>
                </div>
                <div className="flex items-center justify-center px-4 h-full w-[60px] cursor-pointer border border-transparent hover:border-gray-600 hover:bg-lighterDark hover:text-light transition-colors duration-150 ease-in-out" onClick={closeWindow}>
                    <IoCloseSharp/>
                </div>
            </div>
        </div>
    );
}

export default TitleBar