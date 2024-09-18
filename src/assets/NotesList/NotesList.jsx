const NotesList = ({children}) => {

    return(
        <div className="p-4 flex flex-col justify-start items-center h-full w-full overflow-y-auto">
            {children}
        </div>
    );
}

export default NotesList;d