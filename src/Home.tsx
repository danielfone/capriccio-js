import './Home.css'

function Home({ onBegin }: { onBegin: () => void }) {
  return (
    <div>
      <div className="info-box">
        <h2>README.txt</h2>
        <ul>
          <li>This is a hybrid escape room / text-based adventure game I hacked together for our local Ruby meetup.</li>
          <li>There are <b>7 alphanumeric locks</b>. Punctuation and whitespace is ignored in the input.</li>
          <li>There are <b>3 hints for each lock</b>. Use them if you need to. The first should be subtle, the third basically tells you what to do.</li>
          <li>Playing with a team, it takes <b>60-90 minutes</b>. It usually takes longer on your own.</li>
          <li>Unlike a traditional escape room, you're expected to use internet and programming to solve the puzzles.</li>
        </ul>
      </div>

      <p className="begin-link">
        <a href="#" onClick={e => { e.preventDefault(); onBegin(); }}>
          BEGIN
        </a>
      </p>

      <footer>
        Crafted with reckless whimsy by <a href="https://daniel.fone.net.nz">Daniel Fone</a>
      </footer>
    </div>
  );
};

export default Home
