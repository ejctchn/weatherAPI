const app = document.getElementById('app');

// const header = document.createElement('h1');

// const headerContent = document.createTextNode('Develop, Preview, Ship');

// header.appendChild(headerContent);

// app.appendChild(header);

function Header({ title })
{
    return (
        <h1>
            {title ? title : "Default title"}
        </h1>  
    );
}
function HomePage() {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    const [likes, setLikes] = React.useState(0);
  
    function handleClick()
    {
        setLikes(likes + 1);
    }
    return (
      <div>
        <Header title="Develop. Preview. Ship. 🚀" />
        <ul>
            {names.map((name) => 
            (
                <li key={name}>{name}</li>
            ))}
        </ul>
  
        <button onClick={handleClick}>Like</button>
      </div>
    );
  }
ReactDOM.render(<HomePage />, app);