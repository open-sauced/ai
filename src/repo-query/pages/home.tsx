import { RepoQueryPages } from "../../ts/types";

export const Home = ({ ownerName, repoName, setCurrentPage }: { ownerName: string, repoName: string, setCurrentPage: (page: RepoQueryPages) => void }) => (
    <div
        className="flex flex-col justify-center items-center w-full h-full"
        id="chat-dialog-body-start-conversation"
    >
        <div className="text-2xl font-bold text-slate-700">RepoQuery</div>

        <p className="text-sm text-gray-500 w-5/6 text-center mt-4">
With RepoQuery, you can ask questions about
            {" "}

            {ownerName}
/

            {repoName}

            {" "}

and get answers with the help of AI.
            <br />
For RepoQuery to work on a repository, it needs to be indexed by
                us first. Click below to check if this repository is indexed and start the conversation!
        </p>

        <button
            id="chat-dialog-body-start-conversation-button"
            className="bg-orange no-underline border-none rounded-md text-white font-bold py-2 px-4 mt-4 cursor-pointer
                    bg-gradient-to-r from-[#e67e22] to-[#d35400]"
            onClick={() => {
                setCurrentPage(RepoQueryPages.Indexing);
            }}
        >
                    Start the conversation
        </button>
    </div>
);
