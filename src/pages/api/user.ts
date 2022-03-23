export const searchUser = async () => {
    const url = `https://jsonplaceholder.typicode.com/users?name=${name}`
    const res = await fetch(url)
    const data = await res.json()

    return data
}