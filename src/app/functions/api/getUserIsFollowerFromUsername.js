import axios from "axios"

export default async function getUserIsFollowerFromUsername(userName) {
    try {
        const resGetAllFollower = await axios.get("https://skuutapapi.onrender.com/followers");
        const allFollowers = resGetAllFollower.data.followers;
        const isFollower = allFollowers.includes(userName);
        return {
            result: true,
            isFollower: isFollower
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}