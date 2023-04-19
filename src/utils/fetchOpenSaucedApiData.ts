export const getOpenSaucedUser = async (username) => {
    try {
        const response = await fetch(`https://api.opensauced.pizza/v1/users/${username}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }    
    };


    


       



