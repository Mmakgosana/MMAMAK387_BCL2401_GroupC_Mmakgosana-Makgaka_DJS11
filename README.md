TECH TONIC PODCAST APP
Netlify Link: https://mmakgosana-makgaka1.netlify.app/  
Introduction: The Tech Tonic Podcast App is a React-based application designed to manage and play podcasts. The data consists of three main semantics units: SHOW, SEASON AND EPISODE. Each SHOW can have multiple SEASONS, and each SEASON consists of multiple EPISODES. The app provides a user-friendly interface for browsing, searching, and listening to podcasts. It also supports previewing basic information about shows and categorizing shows by genre.

SEMANTIC UNITS
1. SHOW: A specific podcast that contains one or several SEASONS.
2. SEASON: A collection of EPISODES released across a specific time span.
3. EPISODE: Corresponds to a specific MP3 file that the user can listen to.

ADDITIONAL INFORMATION includes a preview, a summarized version of a show containing basic information, which is exposed when an array of different show information is requested. Genre information related to one or more genres that can be assigned to a show.

SET UP INSTRUCTIONS
Before commencing with the project, I installed Node.js and npm and npm router-dom on my laptop.


USAGE EXAMPLES
1. BROWSING SHOWS
   Navigate to the homepage to see a list of all available shows
   click on a show to see detailed information including its seasons and episodes.

2. LISTENING TO EPISODES
   Select a season to view its episodes
   click on an episode to play the audio file

3. SEARCHING SHOWS
   Uses the search bar to find shows by name or genre.

4. PREVIEWING SHOWS
   Preview summaries of different shows by navigating to the preview section.

CONTACT INFORMATION
For any inquiries or feedback, please contact:
Mmakgosana Makgaka
makgakammakgosana@gmail.com
 
Challenges Faced: I struggled with setting different login button, search bar and adding episodes to favourite.

Creative Design Choices: I think I have adhered to the project objectives, I would like to use my skills and experience to build more responsive applications and also work on personal projects.

Overall Learning Experience I have enjoyed building the podcast app, adding other features and making it user-friendly, and observing each functioning of different functions coming together was nice to observe. And in future, I would honestly like to build more projects that are similar to this one.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
