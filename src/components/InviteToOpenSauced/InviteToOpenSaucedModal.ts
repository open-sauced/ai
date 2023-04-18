import "../../index.css";
interface Socials {
    mailAddress?: string;
    twitterUsername?: string;
    linkedInUsername?: string;
}

export const InviteToOpenSaucedModal = (username: string, {mailAddress, twitterUsername, linkedInUsername}: Socials = {}) => {

    
    const inviteToOpenSaucedModal = document.createElement("div");
    Object.assign(inviteToOpenSaucedModal, {
        className: "fixed h-full w-full z-50 bg-gray-600 bg-opacity-50 overflow-y-auto  inset-0 ",
        style: "display: none;",
        id: "invite-modal",
        innerHTML: `<div
        class="min-w-[30%] relative top-60 mx-auto p-4 border w-96 rounded-md shadow-button border-solid border-orange bg-slate-800"
    >
        <div class="mt-2 text-left">
            <h3 class="text-2xl leading-6 font-bold">Invite to OpenSauced!</h3>
            <div class="mt-2">
                <p class="text-sm">
                    Use the social icons below to invite ${username} to OpenSauced.
                </p>
            </div>
        </div>
    </div>`
    });
    return inviteToOpenSaucedModal;
};