Experiment 5: Code Splitting and Lazy Loading in React
Overview This experiment demonstrates performance optimization techniques in React applications. Modern Single Page Applications (SPAs) bundle all JavaScript into one large file by default. This experiment explores Code Splitting, which breaks this bundle into smaller chunks, and Lazy Loading, which loads these chunks only when they are needed.

Sub-Experiment 1: Basic Lazy Loading with Simulated Delay
<img width="1919" height="903" alt="Screenshot 2026-02-18 233316" src="https://github.com/user-attachments/assets/f2f5ea4a-e084-480e-a3d1-171aa6df87c2" />
<img width="1919" height="901" alt="Screenshot 2026-02-18 233308" src="https://github.com/user-attachments/assets/ae757f38-766b-4741-a29e-2b1d3a7f6b78" />
<img width="1919" height="895" alt="Screenshot 2026-02-18 233248" src="https://github.com/user-attachments/assets/7bbfa679-763b-4dda-9a35-44b0f0db74fa" />
<img width="1919" height="897" alt="Screenshot 2026-02-18 233240" src="https://github.com/user-attachments/assets/438be009-8587-48a6-9c97-755fd8d6e38d" />

1. Theoretical Concept
The core idea here is to transform a synchronous component import into an asynchronous one.

Dynamic Imports: Instead of loading a component at the start (static import), the application requests it only when it attempts to render it.
Suspense Mechanism: Since fetching a component takes time (it is asynchronous), React needs a way to "pause" rendering and show a temporary UI. The Suspense component handles this "waiting state" automatically.
Simulation: In a local environment, computers are too fast to see the loading state. This experiment artificially delays the loading process to simulate a slow network connection (like 3G), making the background mechanics of React Suspense visible to the human eye.
2. Code Implementation & Explanation
A. The Artificial Delay Helper To make the "Loading..." text appear, we create a function that forces the browser to wait before resolving the component.

Code Snippet:

javascript
const delayForDemo = (promise) => {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
Explanation: This function takes a promise (the actual component import) as an argument. It returns a new Promise that waits for 2000 milliseconds (2 seconds) using setTimeout. Only after this timer finishes does it return the original component import. This effectively pauses the loading of the component for 2 seconds.
B. Lazy Component Declaration We use React.lazy to define the components we want to load asynchronously.

Code Snippet:

javascript
const About = React.lazy(() => delayForDemo(import('./About')))
const Contact = React.lazy(() => delayForDemo(import('./Contact')))
Explanation:
React.lazy(...): This function tells React that "About" is not a standard component, but a dynamic one that needs to be fetched.
import('./About'): This acts as a Dynamic Import. It tells the bundler (Vite/Webpack) to split 
About.jsx
 into a separate file chunk.
delayForDemo(...)
: Calls our helper function to ensure the file takes at least 2 seconds to "arrive".
C. The Suspense Wrapper We wrap the lazy components to handle the loading state.

Code Snippet:

javascript
<Suspense fallback={<h2>Loading...</h2>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    ...
  </Routes>
</Suspense>
Explanation: The Suspense component acts as a boundary. When the user navigates to /about, React tries to render the <About /> component. Since About is lazy and delayed, it "suspends." React catches this suspension and renders the fallback prop (<h2>Loading...</h2>) instead. Once the 2-second delay is over, React removes the fallback and renders the actual About page.

Sub-Experiment 2: Route-Based Lazy Loading
<img width="1919" height="904" alt="Screenshot 2026-02-18 232834" src="https://github.com/user-attachments/assets/01488045-5c50-411d-bb4b-463e1952767d" />
<img width="1918" height="891" alt="Screenshot 2026-02-18 232819" src="https://github.com/user-attachments/assets/9a11b376-ac7b-4744-8d34-f461df6786f5" />
<img width="1919" height="897" alt="Screenshot 2026-02-18 232806" src="https://github.com/user-attachments/assets/6ba1e5ed-a70e-4a5d-966a-64f854e5d4b3" />

1. Theoretical Concept
This applies the previous concepts to a real-world architecture called Route-Centric Code Splitting.

On-Demand Resources: In a large application, a user visiting the "Home" page should not download the code for the "Settings" or "Dashboard" pages.
Route Handling: The code splitting happens at the Route level. Each URL path (/, /services, /contact) corresponds to a specific chunk of JavaScript.
Performance Impact: This drastically reduces the Initial Load Time and Time to Interactive (TTI) because the browser downloads significantly less data upfront. The remaining code is fetched silently in the background or on demand when the user navigates.
2. Code Implementation & Explanation
A. Production-Standard Lazy Import Unlike the first experiment, we do not use artificial delays here. This is how you would write code in a professional application.

Code Snippet:

javascript
const Services = React.lazy(() => import('./Services'));
const Contact = React.lazy(() => import('./Contact'));
Explanation:
We define Services and Contact as lazy components.
Critically, Home is imported normally (import Home from './Home'). This is intentional: The Home page is the "Critical Rendering Path"—it needs to appear instantly. The other pages can wait.
B. Router Integration This experiment integrates lazy loading directly with react-router-dom.

Code Snippet:

javascript
<Suspense fallback={<div className="loading">Loading...</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Suspense>
Explanation:
The Suspense component wraps the entire Routes block.
Navigation Flow: When a user clicks a link to /services:
The URL changes.
The Router attempts to mount <Services />.
React sees <Services /> is a lazy component and initiates a network request for Services.js chunk.
Suspense immediately shows <div className="loading">Loading...</div>.
Once the network request finishes, the fallback is removed, and the Services page content appears.
C. State Persistence The code includes a theme toggle (Light/Dark mode) to demonstrate an important architectural point.

Code Snippet:

javascript
const [theme, setTheme] = useState('light');
...
<div className={`app ${theme}`}>
Explanation: This shows that lazy loading does not reset the application state. You can lazy load parts of your UI (like the routes) while keeping global state (like the theme) active and consistent in the parent 
App
 component. The theme persists even while the new route is loading.
