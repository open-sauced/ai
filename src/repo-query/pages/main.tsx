import { useState } from "react";
import { ChatCircle } from "../components/ChatCircle";
import { Dialog } from "../components/Dialog";

export const RepoQuery = ( { ownerName, repoName }: { ownerName: string, repoName: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ChatCircle toggleDialog={toggleDialog} />

            <Dialog
                isOpen={isOpen}
                ownerName={ownerName}
                repoName={repoName}
                toggleDialog={toggleDialog}
            />
        </>
    );
};
