import { IoTrash } from "react-icons/io5";

const NotesItem = ({title, data, color}) => {
    return (
        <div className="flex flex-row flex-nowrap w-[97%] p-0 m-[1.5%] min-h-[100px] max-h-[200px] shadow-md rounded-md h-auto flex-shrink-0"
        style={{ backgroundColor: color }}>
            
            {/*LEFT SIDE */}
            <div className="mt-1 mb-1 flex flex-col flex-nowrap w-[90%] h-auto overflow-y-auto">
                {/*Title*/}
                <h1 className="m-[2.5%] w-[95%] break-words font-bold">{title}</h1>
                
                {/*Content*/}
                <p className="m-[2.5%] w-[95%] h-auto break-words">{data}</p>
            </div>

            {/*RIGHT SIDE */}
            <div className="flex justify-center w-[10]">
                <div className="m-[8px] flex justify-center items-center h-[30px] w-[30px] rounded-md
                text-lighterDark hover:bg-lighterDark hover:text-light transition-colors duration-150 ease-in-out ">
                    <IoTrash className=" h-[22px] w-[22px] "/>
                </div>
                
            </div>
            
        </div>
    )
}

export default NotesItem;