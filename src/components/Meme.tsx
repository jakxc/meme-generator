import { useState, useEffect, ChangeEvent } from "react";

const Meme = () =>
{
    interface IMeme {
        topText: string;
        bottomText: string;
        randomImage: string;
    }

    const [meme, setMeme] = useState<IMeme>({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    const [allMemes, setAllMemes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]= useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
        .then(() => setLoading(false))
        .catch(err => setError(err))
    }, [])
    
    
    const getMemeImage = () => {
        const randomNumber: number = Math.floor(Math.random() * allMemes.length)
        const url: string = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))  
    }

    /*Event listener for input and button*/ 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))  
    }

    if (loading) 
    {
        return (
            <h1>Loading...</h1>
        )
    }  

    if (error) 
    {
        return <pre>{JSON.stringify(error)}</pre>
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form-button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" alt="Meme" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme