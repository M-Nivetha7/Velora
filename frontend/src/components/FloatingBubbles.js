import "../styles/auth.css";

export default function FloatingBubbles() {
  return (
    <ul className="bubbles">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i}></li>
      ))}
    </ul>
  );
}
