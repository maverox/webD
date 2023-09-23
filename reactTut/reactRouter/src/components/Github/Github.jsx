import { useLoaderData } from 'react-router-dom';
const Github = () => {
    const user = useLoaderData();

    // useEffect( () => {
    // fetch('https://api.github.com/users/maverox')
    // .then(response => response.json())
    // .then(data => setUser(data))
    //     console.log(user)
    // }, [])
    
  return (
    <div className='text-center flex flex-wrap justify-between bg-gray-400 text-white p-4 text-3xl '>
        <h1>Github</h1>
        {
            user ? <><h2>{user?.name}</h2>
            <img src={user.avatar_url} width={300} className='order-first' />
            <p>{user.followers}</p>
            <p>{user.following}</p> 
            </>
             : <p>loading...</p>
        }
    </div>
  )
}

export default Github
export const githubInfoLoader = async () => {
    const respone = await fetch('https://api.github.com/users/maverox')
    const data = await respone.json();
    return data;
}