import { differenceInDays } from "date-fns";
import { IUserPR } from "../ts/types";

export const getUserPRVelocity = ((prDetails: IUserPR[]) => {
    const mergedPRs = prDetails.filter((prState: IUserPR) => prState.state.toLowerCase() === "merged");

    const totalDays = mergedPRs.reduce((total: number, pr: IUserPR) => {
        const daysBetween = differenceInDays(new Date(pr.closed_at), new Date(pr.created_at));

        return (total += daysBetween);
    }, 0);

    const averageVelocity: number = mergedPRs.length > 0 ? Math.round(totalDays / mergedPRs.length) : 0;

    return averageVelocity;
});
