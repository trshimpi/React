import ImageCard from "./ImageCard";


function App() {
  

  // const imageUrl = 'https://d1til5nimponbk.cloudfront.net/insta-media/Gauahar Khan/2024-08-21/CAROUSEL_ALBUM/17879883315054654.png';
    const sourceTag = 'ig:handlenamekwefjasjdfkasdfjasdfhashdfhaksjdhfh';

    // const imageUrl = "https://www.thefamouspeople.com/profiles/images/sabyasachi-mukherjee-1.jpg";
    const imageUrl = "https://www.dailypioneer.com/uploads/2020/story/images/big/karan-johar-returns-to-instagram-after-two-months-2020-08-15.jpg"
    return (
      <div className="App" style={styles.appContainer}>
          <h1 style={styles.header}>Image Card Example</h1>
          <ImageCard imageUrl={imageUrl} sourceTag={sourceTag} />
      </div>
  );
}

const styles = {
  appContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
  },
  header: {
      marginBottom: '20px',
      color: '#343a40',
  },
};


export default App
